export async function onRequestGet(context) {
  const { request, params } = context;
  const backendOrigin = context.env.BACKEND_ORIGIN || "https://newsapp.aasmo.in";
  const upstreamUrl = new URL(
    `/api/v1/user/share/${encodeURIComponent(params.slug)}`,
    backendOrigin,
  );

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        accept: request.headers.get("accept") || "text/html",
        "user-agent": request.headers.get("user-agent") || "",
        "x-forwarded-host": new URL(request.url).host,
        "x-forwarded-proto": "https",
      },
    });

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: {
        "cache-control": upstreamResponse.headers.get("cache-control") || "public, max-age=300",
        "content-type": upstreamResponse.headers.get("content-type") || "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Share preview upstream request failed", error);
    return new Response("Share preview is temporarily unavailable", {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
}
