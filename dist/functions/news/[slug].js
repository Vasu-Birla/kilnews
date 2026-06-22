// // export async function onRequest(context) {
// //   const { request, params } = context;
// //   const ua = (request.headers.get("user-agent") || "").toLowerCase();

// //   const botPatterns = [
// //     "facebookexternalhit", "facebot", "whatsapp", "twitterbot",
// //     "telegrambot", "linkedinbot", "slackbot", "discordbot",
// //     "pinterest", "skypeuripreview", "redditbot"
// //   ];
// //   const isBot = botPatterns.some((p) => ua.includes(p));

// //   if (!isBot) return context.next(); // insaan ko normal SPA

// //   const slug = params.slug;
// //   // ⚠️ yahi woh route hai jo backend me abhi actually live hai
// // const backendUrl = `https://newsapp.aasmo.in/share/news/${slug}`;

// //   try {
// //     const res = await fetch(backendUrl, {
// //       headers: { "user-agent": request.headers.get("user-agent") },
// //     });
// //     const html = await res.text();
// //     return new Response(html, {
// //       headers: { "content-type": "text/html; charset=utf-8" },
// //     });
// //   } catch (err) {
// //     return context.next();
// //   }
// // }

// export async function onRequest(context) {
//   const { request, params } = context;
//   const ua = (request.headers.get("user-agent") || "").toLowerCase();

//   const botPatterns = [
//     "facebookexternalhit", "facebot", "whatsapp", "twitterbot",
//     "telegrambot", "linkedinbot", "slackbot", "discordbot"
//   ];
//   const isBot = botPatterns.some((p) => ua.includes(p));

//   // अगर इंसान है (नॉर्मल यूजर), तो वेबसाइट दिखाओ
//   if (!isBot) return context.next(); 

//   // अगर व्हाट्सएप/फेसबुक बॉट है, तो बैकएंड से थंबनेल वाला पेज लाओ
//   const slug = params.slug; // पक्का करें कि ये आपकी फाइल के नाम [slug].js से मैच हो रहा है
  
//   // आपके बैकएंड का सही रूट (बिना /api/v1/ के अगर आपने routes.js में बाहर रखा है)
//   const backendUrl = `https://newsapp.aasmo.in/share/${slug}`;

//   try {
//     const res = await fetch(backendUrl, {
//       headers: { "user-agent": request.headers.get("user-agent") },
//     });
//     const html = await res.text();
//     return new Response(html, {
//       headers: { "content-type": "text/html; charset=utf-8" },
//     });
//   } catch (err) {
//     return context.next();
//   }
// }

export async function onRequest(context) {
  const { request, params } = context;
  const ua = (request.headers.get("user-agent") || "").toLowerCase();

  const botPatterns = [
    "facebookexternalhit", "facebot", "whatsapp", "twitterbot",
    "telegrambot", "linkedinbot", "slackbot", "discordbot",
    "bot", "spider", "preview"
  ];
  const isBot = botPatterns.some((p) => ua.includes(p));

  if (!isBot) return context.next();

  const slug = params.slug;
  const backendOrigin = context.env.BACKEND_ORIGIN || "https://newsapp.aasmo.in";
  const upstreamUrl = new URL(
    `/api/v1/user/share/${encodeURIComponent(slug)}`,
    backendOrigin,
  );

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        accept: request.headers.get("accept") || "text/html",
        "user-agent": request.headers.get("user-agent") || "",
      },
    });

    if (!upstreamResponse.ok) return context.next();

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: {
        "cache-control": "public, max-age=300",
        "content-type": "text/html; charset=utf-8",
      },
    });
  } catch {
    return context.next();
  }
}
