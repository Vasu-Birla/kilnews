const ALLOWED_RESPONSE_HEADERS = [
  "accept-ranges",
  "cache-control",
  "content-range",
  "content-type",
  "etag",
  "last-modified",
];

export async function onRequest(context) {
  const { request, params } = context;
  if (!['GET', 'HEAD'].includes(request.method)) {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const backendOrigin = context.env.BACKEND_ORIGIN || "https://newsapp.aasmo.in";
  const pathParts = Array.isArray(params.path) ? params.path : [params.path];
  const safePath = pathParts.filter(Boolean).map(encodeURIComponent).join("/");
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`/uploads/${safePath}`, backendOrigin);
  upstreamUrl.search = incomingUrl.search;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: {
        accept: request.headers.get("accept") || "image/*",
        range: request.headers.get("range") || "",
      },
    });
    const headers = new Headers();

    for (const name of ALLOWED_RESPONSE_HEADERS) {
      const value = upstreamResponse.headers.get(name);
      if (value) headers.set(name, value);
    }
    if (!headers.has("cache-control")) {
      headers.set("cache-control", "public, max-age=604800");
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers,
    });
  } catch (error) {
    console.error("Upload upstream request failed", error);
    return new Response("Upload is temporarily unavailable", { status: 502 });
  }
}
