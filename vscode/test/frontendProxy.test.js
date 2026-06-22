import assert from "node:assert/strict";
import test from "node:test";
import { onRequest as proxyNewsPreview } from "../../dist/functions/news/[slug].js";
import { onRequestGet as proxySharePreview } from "../../dist/functions/share/[slug].js";

const SLUG = "article-507f1f77bcf86cd799439011";

test("the frontend /share route proxies HTML without redirecting to the backend domain", async () => {
  const originalFetch = globalThis.fetch;
  let requestedUrl;

  globalThis.fetch = async (url) => {
    requestedUrl = String(url);
    return new Response('<meta property="og:title" content="Article" />', {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  };

  try {
    const response = await proxySharePreview({
      env: { BACKEND_ORIGIN: "https://newsapp.aasmo.in" },
      params: { slug: SLUG },
      request: new Request(`https://news.aasmo.in/share/${SLUG}`),
    });

    assert.equal(
      requestedUrl,
      `https://newsapp.aasmo.in/api/v1/user/share/${SLUG}`,
    );
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("location"), null);
    assert.match(await response.text(), /property="og:title"/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("the legacy /news bot handler proxies the preview body instead of issuing a backend redirect", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("<html>preview</html>", { status: 200 });

  try {
    const response = await proxyNewsPreview({
      env: { BACKEND_ORIGIN: "https://newsapp.aasmo.in" },
      next: () => new Response("SPA"),
      params: { slug: SLUG },
      request: new Request(`https://news.aasmo.in/news/${SLUG}`, {
        headers: { "user-agent": "WhatsApp/2.0" },
      }),
    });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("location"), null);
    assert.equal(await response.text(), "<html>preview</html>");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
