const HTML_ENTITIES = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

const decodeCodePoint = (value, radix) => {
  const codePoint = Number.parseInt(value, radix);
  return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
    ? String.fromCodePoint(codePoint)
    : "";
};

const decodeHtmlEntities = (value) =>
  value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    const normalizedCode = code.toLowerCase();

    if (normalizedCode.startsWith("#x")) {
      return decodeCodePoint(normalizedCode.slice(2), 16);
    }

    if (normalizedCode.startsWith("#")) {
      return decodeCodePoint(normalizedCode.slice(1), 10);
    }

    return HTML_ENTITIES[normalizedCode] ?? entity;
  });

export const toPlainText = (value, maxLength = 300) => {
  if (!value) return "";

  const plainText = decodeHtmlEntities(String(value))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength - 1).trimEnd()}…`;
};

export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export const normalizeBaseUrl = (value) =>
  String(value || "https://news.aasmo.in").replace(/\/+$/, "");

export const getPublicImageUrl = (imageUrl, frontendBaseUrl) => {
  const frontendBase = normalizeBaseUrl(frontendBaseUrl);
  if (!imageUrl) return `${frontendBase}/image.png`;

  const source = String(imageUrl).trim();
  if (!source) return `${frontendBase}/image.png`;
  if (source.startsWith(frontendBase)) return source;

  if (source.startsWith("https://newsapp.aasmo.in")) {
    return source.replace("https://newsapp.aasmo.in", frontendBase);
  }

  if (source.startsWith("http://newsapp.aasmo.in")) {
    return source.replace("http://newsapp.aasmo.in", frontendBase);
  }

  if (source.startsWith("https://")) return source;
  if (source.startsWith("http://")) return source.replace(/^http:\/\//, "https://");
  if (source.startsWith("/")) return `${frontendBase}${source}`;

  return `${frontendBase}/${source}`;
};

export const buildSharePreviewHtml = ({
  articleUrl,
  description,
  imageUrl,
  title,
}) => {
  const safeArticleUrl = escapeHtml(articleUrl);
  const safeDescription = escapeHtml(description);
  const safeImageUrl = escapeHtml(imageUrl);
  const safeTitle = escapeHtml(title);
  const javascriptArticleUrl = JSON.stringify(articleUrl).replaceAll("<", "\\u003c");

  return `<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="EMS-News" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:url" content="${safeArticleUrl}" />
  <meta property="og:image" content="${safeImageUrl}" />
  <meta property="og:image:secure_url" content="${safeImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${safeImageUrl}" />
  <link rel="canonical" href="${safeArticleUrl}" />
  <meta http-equiv="refresh" content="0;url=${safeArticleUrl}" />
  <script>window.location.replace(${javascriptArticleUrl});</script>
</head>
<body>
  <p>Redirecting to <a href="${safeArticleUrl}">${safeTitle}</a>…</p>
</body>
</html>`;
};
