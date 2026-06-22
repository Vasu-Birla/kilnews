# WhatsApp News Sharing Fix — Friend Handoff Guide

## Expected result

After deploying these changes:

- The WhatsApp message contains only:
  `https://news.aasmo.in/share/ARTICLE-SLUG`
- WhatsApp requests that frontend-domain URL.
- The frontend server internally proxies the request to the backend preview controller.
- The backend address is not returned as a redirect and is not displayed in the WhatsApp message or preview.
- The first HTML response contains the article title, description, and thumbnail metadata.
- A human opening `/share/ARTICLE-SLUG` is redirected to:
  `https://news.aasmo.in/news/ARTICLE-SLUG`

This result requires all three deployment steps:

1. Deploy/restart the changed backend.
2. Rebuild and deploy the changed frontend.
3. Enable exactly one frontend proxy option: Cloudflare Pages Functions, Nginx, or Apache.

## Files changed

| File | Purpose |
| --- | --- |
| `dist/src/components/Main_NewsDetails/NewsDetailPage.jsx` | Share `/share/:slug` to WhatsApp |
| `dist/src/Services/authRoutes.js` | Remove development-tunnel API URL |
| `dist/.env` | Set production frontend/backend URLs |
| `vscode/Controllers/newsController.js` | Generate server-side OG preview HTML |
| `vscode/Utils/sharePreview.js` | Sanitize metadata and create public image URLs |
| `vscode/Routes/user.routes.js` | Existing backend `/share/:slug` route; verified |
| `vscode/server.js` | Serve local `/uploads/` files publicly |
| `vscode/.env` | Set the frontend redirect domain |
| `dist/functions/share/[slug].js` | Cloudflare frontend-domain share proxy |
| `dist/functions/uploads/[[path]].js` | Cloudflare frontend-domain upload proxy |
| `dist/functions/news/[slug].js` | Remove backend redirect from legacy bot handler |
| `deploy/nginx-news.aasmo.in.locations.conf` | Nginx proxy alternative |
| `deploy/apache-news.aasmo.in.conf` | Apache proxy alternative |

## 1. Frontend WhatsApp URL

File:
`dist/src/components/Main_NewsDetails/NewsDetailPage.jsx`

### Old code

```jsx
const getWhatsappShareUrl = () => {
  if (!article) return "";
  const finalSlug =
    article.slug_en ||
    `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
  const cleanBase = BASE_FRONTEND_URL.endsWith("/")
    ? BASE_FRONTEND_URL.slice(0, -1)
    : BASE_FRONTEND_URL;

  return `${cleanBase}/news/${finalSlug}`;
};
```

### New code

```jsx
const getWhatsappShareUrl = () => {
  if (!article) return "";
  const finalSlug =
    article.slug_en ||
    `${createSlug(article.title_hi || article.title_en)}-${article._id}`;
  const cleanBase = BASE_FRONTEND_URL.endsWith("/")
    ? BASE_FRONTEND_URL.slice(0, -1)
    : BASE_FRONTEND_URL;

  return decodeURIComponent(`${cleanBase}/share/${finalSlug}`);
};
```

### Old WhatsApp button

```jsx
href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
  stripHtmlTags(article.title_hi || article.title_en) +
    "\n\nपूरी खबर यहाँ पढ़ें: " +
    getWhatsappShareUrl()
)}`}
```

### New WhatsApp button

```jsx
href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
  `${stripHtmlTags(article.title_hi || article.title_en)}\n\n${getWhatsappShareUrl()}`
)}`}
```

The normal `getShareUrl()` remains `/news/:slug` for copy, native share, and Facebook.

## 2. Frontend production URLs

File: `dist/.env`

### Old values

```dotenv
VITE_API_BASE_URL=https://backend.xpressnews.in
VITE_BASE_URL=https://emsindia.com/
```

### New values

```dotenv
VITE_API_BASE_URL=https://newsapp.aasmo.in/api/v1/user
VITE_BASE_URL=https://news.aasmo.in/
```

File: `dist/src/Services/authRoutes.js`

### Old code

```js
export const API_BASE_URL =
  "https://gm2rx81j-8004.inc1.devtunnels.ms/api/v1/user";
```

### New code

```js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://newsapp.aasmo.in/api/v1/user";
```

Also use this fallback in `NewsDetailPage.jsx`:

```js
const BASE_FRONTEND_URL =
  import.meta.env.VITE_BASE_URL || "https://news.aasmo.in";
```

## 3. Backend preview controller

File: `vscode/Controllers/newsController.js`

Add this import near the top:

```js
import {
  buildSharePreviewHtml,
  getPublicImageUrl,
  normalizeBaseUrl,
  toPlainText,
} from '../Utils/sharePreview.js';
```

### Old controller

```js
export const shareNewsPreview = async (req, res) => {
  try {
    const BASE_URL = process.env.FRONTEND_BASE_URL;
    const slug = req.params.slug;
    const newsId = slug.split("-").pop();
    const news = await News.findById(newsId);

    if (!news) return res.status(404).send("News not found");

    const title = news.title_hi || news.title_en || "Aasmo News";
    const image = news.media?.[0]?.url || "https://news.aasmo.in/logo.png";
    const frontendUrl = `${BASE_URL}/news/${slug}`;

    res.send(`<!DOCTYPE html>...`);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
```

### New controller

```js
export const shareNewsPreview = async (req, res) => {
  try {
    const frontendBaseUrl = normalizeBaseUrl(process.env.FRONTEND_BASE_URL);
    const slug = String(req.params.slug || "").trim();
    const newsId = slug.split("-").pop();

    if (!slug || !isValidObjectId(newsId)) {
      return res.status(400).type("text/plain").send("Invalid article slug");
    }

    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).type("text/plain").send("News not found");
    }

    const title =
      toPlainText(news.title_hi || news.title_en, 160) || "EMS-News";

    const description =
      toPlainText(
        news.short_description ||
          news.summary_hi ||
          news.summary_en ||
          news.content_hi ||
          news.content_en ||
          news.content,
        300,
      ) || "Read the full article on EMS-News.";

    const imageSource = news.media?.find(
      (item) => item.type !== "video",
    )?.url;
    const imageUrl = getPublicImageUrl(imageSource, frontendBaseUrl);
    const articleUrl =
      `${frontendBaseUrl}/news/${encodeURIComponent(slug)}`;

    const html = buildSharePreviewHtml({
      articleUrl,
      description,
      imageUrl,
      title,
    });

    res
      .status(200)
      .set({
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Content-Type": "text/html; charset=utf-8",
      })
      .send(html);
  } catch (err) {
    console.error("Failed to render news share preview:", err);
    res.status(500).type("text/plain").send("Server Error");
  }
};
```

The existing route must remain before authenticated routes:

```js
router.get('/share/:slug', shareNewsPreview);
```

## 4. New backend helper file

Copy the complete file:
`vscode/Utils/sharePreview.js`

This file performs four important operations:

- Removes HTML/script/style markup from titles and descriptions.
- Escapes values before inserting them into HTML.
- Converts backend `/uploads/` URLs to the frontend domain.
- Returns the complete OG/Twitter HTML plus meta-refresh and JavaScript redirects.

Important generated metadata includes:

```html
<meta property="og:type" content="article" />
<meta property="og:site_name" content="EMS-News" />
<meta property="og:title" content="ARTICLE TITLE" />
<meta property="og:description" content="ARTICLE DESCRIPTION" />
<meta property="og:url" content="https://news.aasmo.in/news/ARTICLE-SLUG" />
<meta property="og:image" content="PUBLIC HTTPS IMAGE" />
<meta property="og:image:secure_url" content="PUBLIC HTTPS IMAGE" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
```

If an article has no image, the fallback is the existing public PNG:

```text
https://news.aasmo.in/image.png
```

## 5. Backend environment and uploads

File: `vscode/.env`

### Old value

```dotenv
FRONTEND_BASE_URL = https://xpressnews.in
```

### New value

```dotenv
FRONTEND_BASE_URL=https://news.aasmo.in
```

File: `vscode/server.js`

Add:

```js
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
```

Replace the disabled upload line:

```js
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

with:

```js
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  dotfiles: 'deny',
  fallthrough: true,
  maxAge: '7d',
}));
```

## 6. Frontend-domain proxy

### Option A — Cloudflare Pages

The repository already contains Cloudflare Pages-style functions. Copy/deploy:

```text
dist/functions/share/[slug].js
dist/functions/uploads/[[path]].js
dist/functions/news/[slug].js
```

Set this Cloudflare environment variable:

```text
BACKEND_ORIGIN=https://newsapp.aasmo.in
```

The old active `/news` function used a `301` redirect to a backend domain. The new function fetches the preview HTML on the server and returns it under the frontend URL without a client-visible backend redirect.

### Option B — Nginx

Use the contents of:
`deploy/nginx-news.aasmo.in.locations.conf`

Place those locations inside the `news.aasmo.in` HTTPS server block before the React `location /` fallback. The configured backend port is `8004`.

### Option C — Apache

Use the contents of:
`deploy/apache-news.aasmo.in.conf`

Place them inside the `news.aasmo.in` SSL VirtualHost before the React rewrite/fallback. Enable `proxy` and `proxy_http` modules. The configured backend port is `8004`.

Do not install all three options. Use the option matching the actual frontend host.

## 7. Build and deployment

Frontend:

```bash
cd dist
npm ci
npm run build
```

Deploy the newly generated frontend output and the applicable proxy/function files.

Backend:

```bash
cd vscode
npm ci
npm test
```

Restart the backend process after deploying the files and environment changes.

## 8. Required production tests

Use a real slug ending with the 24-character MongoDB article ID:

```bash
curl -s "https://news.aasmo.in/share/REAL-ARTICLE-SLUG" \
  | grep -Ei "og:title|og:description|og:image|og:url"
```

The response must contain frontend URLs, for example:

```html
<meta property="og:url" content="https://news.aasmo.in/news/REAL-ARTICLE-SLUG" />
<meta property="og:image" content="https://news.aasmo.in/uploads/news/image.jpg" />
```

Test the exact image URL returned by `og:image`:

```bash
curl -I "https://news.aasmo.in/uploads/news/image.jpg"
```

Required result:

```text
HTTP 200
content-type: image/jpeg
```

or:

```text
HTTP 200
content-type: image/png
```

Test redirect behavior in a browser:

```text
https://news.aasmo.in/share/REAL-ARTICLE-SLUG
```

It must land on:

```text
https://news.aasmo.in/news/REAL-ARTICLE-SLUG
```

Finally inspect the WhatsApp text before sending. It must contain:

```text
https://news.aasmo.in/share/REAL-ARTICLE-SLUG
```

It must not contain:

```text
https://newsapp.aasmo.in/api/v1/user/share/...
https://news.aasmo.in/news/...?t=...
```

## Important limitation

The code has automated coverage for metadata generation and proxy behavior, but the public domains could not be reached from the development environment. Therefore, do not call the production issue fully verified until both production `curl` tests return the required HTML and image content type.
