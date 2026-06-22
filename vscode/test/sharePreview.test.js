import assert from "node:assert/strict";
import test from "node:test";
import {
  buildSharePreviewHtml,
  getPublicImageUrl,
  toPlainText,
} from "../Utils/sharePreview.js";

const FRONTEND_URL = "https://news.aasmo.in";

test("getPublicImageUrl maps backend and relative uploads to the frontend domain", () => {
  assert.equal(
    getPublicImageUrl(
      "https://newsapp.aasmo.in/uploads/news/image.jpg",
      `${FRONTEND_URL}/`,
    ),
    `${FRONTEND_URL}/uploads/news/image.jpg`,
  );
  assert.equal(
    getPublicImageUrl("/uploads/news/image.jpg", FRONTEND_URL),
    `${FRONTEND_URL}/uploads/news/image.jpg`,
  );
  assert.equal(
    getPublicImageUrl(undefined, FRONTEND_URL),
    `${FRONTEND_URL}/image.png`,
  );
});

test("getPublicImageUrl preserves public HTTPS object-storage URLs", () => {
  const imageUrl = "https://cdn.example.com/news/image.jpg";
  assert.equal(getPublicImageUrl(imageUrl, FRONTEND_URL), imageUrl);
});

test("toPlainText removes markup, scripts, entities, and excess whitespace", () => {
  assert.equal(
    toPlainText("<h1>News &amp; updates</h1><script>alert(1)</script>  now"),
    "News & updates now",
  );
});

test("preview HTML contains complete OG data, safe values, and frontend redirect", () => {
  const articleUrl = `${FRONTEND_URL}/news/article-507f1f77bcf86cd799439011`;
  const imageUrl = `${FRONTEND_URL}/uploads/news/image.jpg`;
  const html = buildSharePreviewHtml({
    articleUrl,
    description: 'Description "quoted"',
    imageUrl,
    title: "A <safe> title",
  });

  assert.match(html, /property="og:type" content="article"/);
  assert.match(html, /property="og:site_name" content="EMS-News"/);
  assert.match(html, /property="og:title" content="A &lt;safe&gt; title"/);
  assert.match(html, /property="og:description" content="Description &quot;quoted&quot;"/);
  assert.match(html, new RegExp(`property="og:image" content="${imageUrl}"`));
  assert.match(html, new RegExp(`property="og:image:secure_url" content="${imageUrl}"`));
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  assert.match(html, new RegExp(`property="og:url" content="${articleUrl}"`));
  assert.match(html, /window\.location\.replace\("https:\/\/news\.aasmo\.in\/news\//);
  assert.doesNotMatch(html, /newsapp\.aasmo\.in/);
});
