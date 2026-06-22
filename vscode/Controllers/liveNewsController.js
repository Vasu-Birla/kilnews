import LiveNews from "../Models/liveNews.model.js";
import { generateSlug } from "../Utils/slugifyUtils.js";
import { uploadFileToSpaces, deleteFileFromSpaces } from '../Services/s3Service.js';

import News from '../Models/news.model.js';

const BASE_URL = process.env.FRONTEND_BASE_URL;

if (!BASE_URL) {
  throw new Error("FRONTEND_BASE_URL is not defined in .env");
}


// export const createLiveNews = async (req, res) => {
//   try {
//     const { title_en, title_hi, summary_en, summary_hi, content_en, content_hi, category, subCategory } = req.body;
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized user" });
//     }

//     // 🟢 Create a new live news entry
//     const liveNews = await LiveNews.create({
//       title_en,
//       title_hi,
//       summary_en,
//       summary_hi,
//       content_en,
//       content_hi,
//       category,
//       subCategory,
//       createdBy: userId,
//       status: "live",
//       startedAt: new Date(),
//     });

//     // 🟢 Generate bilingual slug (Hindi preferred)
//     const slugBase = title_hi?.trim() || title_en?.trim() || "live-news";
//     liveNews.slug_en = `${generateSlug(slugBase)}-${liveNews._id}`;
//     liveNews.slug_hi = `${generateSlug(slugBase)}-${liveNews._id}`;
//     await liveNews.save();

//     // 🟢 Generate shareable link
//     const shareLink = `https://news.aasmo.in/live/${liveNews.slug_en}`;

//     res.status(201).json({
//       success: true,
//       message: "Live news started successfully",
//       data: { ...liveNews.toObject(), shareLink },
//     });
//   } catch (error) {
//     console.error("❌ Error creating live news:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create live news",
//       error: error.message,
//     });
//   }
// };



export const createLiveNews = async (req, res) => {
  try {
    const {
      title_en,
      title_hi,
      summary_en,
      summary_hi,
      content_en,
      content_hi,
      category,
      subCategory,
      country,
      state,
      city,
    } = req.body;

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

  0

    let coverImage = {};

    // 🟢 Handle cover image upload (optional)
  if (req.file) {
      console.log("✅ Cover image file received:", req.file.originalname, req.file.mimetype);
  const imageUrl = await uploadFileToSpaces(req.file, "live-news");
  coverImage = { url: imageUrl };
} else {
  console.log("❌ No cover image file found in request");
}

    // 🟢 Choose slug base (Hindi preferred if available)
    const slugBase = title_hi?.trim() || title_en?.trim() || "live-news";

    // 🟢 Create new Live News document
    const liveNews = await LiveNews.create({
      title_en: title_en || "",
      title_hi: title_hi || "",
      summary_en: summary_en || "",
      summary_hi: summary_hi || "",
      content_en: content_en || "",
      content_hi: content_hi || "",
      category,
      subCategory,
      country,
      state,
      city,
      createdBy: userId,
      status: "live",
      startedAt: new Date(),
      coverImage,
    });

    // 🟢 Generate bilingual slugs
    const slug = `${generateSlug(slugBase)}-${liveNews._id}`;
    liveNews.slug_en = slug;
    liveNews.slug_hi = slug;
    await liveNews.save();

    // 🟢 Create shareable link
    // const shareLink = `https://news.aasmo.in/live/${liveNews.slug_en}`;
    const shareLink = `${BASE_URL}/live/${liveNews.slug_en}`;

    res.status(201).json({
      success: true,
      message: "✅ Live news created successfully",
      data: { ...liveNews.toObject(), shareLink },
    });
  } catch (error) {
    console.error("❌ Error creating live news:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create live news",
      error: error.message,
    });
  }
};


export const addLiveUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    let { text_en, text_hi } = req.body;
    let media = [];

    // 🟢 Handle file uploads if any
    if (req.files && req.files.length > 0) {
      media = await Promise.all(
        req.files.map(async (file) => {
          const url = await uploadFileToSpaces(file, "live-news");
          return {
            url,
            type: file.mimetype.startsWith("video") ? "video" : "image",
            caption_en: file.originalname || "",
            caption_hi: "",
          };
        })
      );
    }

    const liveNews = await LiveNews.findById(id);
    if (!liveNews) {
      return res.status(404).json({ success: false, message: "Live news not found" });
    }

    if (liveNews.status === "ended") {
      return res.status(400).json({ success: false, message: "Cannot add updates to ended live news" });
    }

    const newUpdate = { text_en, text_hi, media, createdAt: new Date() };
    liveNews.updates.unshift(newUpdate);
    await liveNews.save();

    res.status(200).json({
      success: true,
      message: "Live update added successfully",
      data: liveNews,
    });
  } catch (error) {
    console.error("❌ Error adding live update:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add live update",
      error: error.message,
    });
  }
};

/* =====================================================
   🟢 3️⃣ GET LIVE NEWS BY ID (Public / Viewers)
// ===================================================== */
// export const getLiveNewsById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const liveNews = await LiveNews.findById(id)
//       .populate("createdBy", "name email profileImage role")
//       .populate("category", "name_en name_hi")
//       .populate("subCategory", "name_en name_hi");

//     if (!liveNews) {
//       return res.status(404).json({ success: false, message: "Live news not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Live news fetched successfully",
//       data: liveNews,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching live news:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch live news",
//       error: error.message,
//     });
//   }
// };

// export const getLiveNewsById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const liveNews = await LiveNews.findById(id)
//       .populate("createdBy", "name email profileImage role")
//       .populate("category", "name_en name_hi")
//       .populate("subCategory", "name_en name_hi");

//     // ✅ Check if not found
//     if (!liveNews) {
//       return res.status(404).json({
//         success: false,
//         message: "Live news not found",
//       });
//     }

//     // ✅ Check if live ended (example field names)
//     if (liveNews.isLive === false || liveNews.status === "ended") {
//       return res.status(404).json({
//         success: false,
//         message: "This live session has ended",
//       });
//     }

//     // ✅ If still live, return details
//     res.status(200).json({
//       success: true,
//       message: "Live news fetched successfully",
//       data: liveNews,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching live news:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch live news",
//       error: error.message,
//     });
//   }
// };

export const getLiveNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    // 💡 If id is slug (string with Hindi/English letters), search by slug
    const query = /^[0-9a-fA-F]{24}$/.test(id)
      ? { _id: id }
      : { slug_en: id };

    const liveNews = await LiveNews.findOne(query)
      .populate("createdBy", "name email profileImage role")
      .populate("category", "name_en name_hi")
      .populate("subCategory", "name_en name_hi");

    if (!liveNews) {
      return res.status(404).json({
        success: false,
        message: "Live news not found",
      });
    }

    if (liveNews.isLive === false || liveNews.status === "ended") {
      return res.status(404).json({
        success: false,
        message: "This live session has ended",
      });
    }

    res.status(200).json({
      success: true,
      message: "Live news fetched successfully",
      data: liveNews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch live news",
      error: error.message,
    });
  }
};


/* =====================================================
   🟢 4️⃣ END LIVE NEWS (Stop broadcasting)
===================================================== */

// export const endLiveNews = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const liveNews = await LiveNews.findById(id);
//     if (!liveNews) {
//       return res.status(404).json({ success: false, message: "Live news not found" });
//     }

//     if (liveNews.status === "ended") {
//       return res.status(400).json({ success: false, message: "Live news already ended" });
//     }

//     liveNews.status = "ended";
//     liveNews.endedAt = new Date();
//     await liveNews.save();

//     res.status(200).json({
//       success: true,
//       message: "Live news ended successfully",
//       data: liveNews,
//     });
//   } catch (error) {
//     console.error("❌ Error ending live news:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to end live news",
//       error: error.message,
//     });
//   }
// };


// export const getAllLiveNews = async (req, res) => {
//   try {
//     const {
//       category,
//       subCategory,
//       search, // keyword
//       limit = 20,
//       page = 1,
//     } = req.query;

//     const query = {
//       status: { $ne: "ended" }, // 🚫 Exclude ended news
//     };

//     // 🔍 Optional filters
//     if (category) query.category = category;
//     if (subCategory) query.subCategory = subCategory;
//     if (search) {
//       query.$or = [
//         { title_en: { $regex: search, $options: "i" } },
//         { title_hi: { $regex: search, $options: "i" } },
//         { summary_en: { $regex: search, $options: "i" } },
//         { summary_hi: { $regex: search, $options: "i" } },
//       ];
//     }

//     const skip = (page - 1) * limit;

//     // 📦 Fetch live news
//     const liveNewsList = await LiveNews.find(query)
//       .populate("createdBy", "name profileImage role")
//       .populate("category", "name_en name_hi")
//       .populate("subCategory", "name_en name_hi")
//       .sort({ createdAt: -1 }) // newest first
//       .skip(skip)
//       .limit(Number(limit));

//     const totalCount = await LiveNews.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       message: "Live news fetched successfully (excluding ended)",
//       count: liveNewsList.length,
//       total: totalCount,
//       currentPage: Number(page),
//       totalPages: Math.ceil(totalCount / limit),
//       data: liveNewsList,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching live news:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch live news",
//       error: error.message,
//     });
//   }
// };

export const getAllLiveNews = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      search,
      limit = 20,
      page = 1,
      lang = "hi",
    } = req.query;

    // ✅ ONLY ACTIVE LIVE NEWS
    const query = {
      status: "live",
    };

    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    if (search) {
      query.$or = [
        { title_en: { $regex: search, $options: "i" } },
        { title_hi: { $regex: search, $options: "i" } },
        { summary_en: { $regex: search, $options: "i" } },
        { summary_hi: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // ✅ language based select
    const selectFields =
      lang === "hi"
        ? "title_hi summary_hi content_hi updates coverImage slug_hi"
        : "title_en summary_en content_en updates coverImage slug_en";

    const liveNewsList = await LiveNews.find(query)
      .select(selectFields + " category subCategory createdBy status createdAt")
      .populate("createdBy", "name profileImage role")
      .populate("category", "name_en name_hi")
      .populate("subCategory", "name_en name_hi")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalCount = await LiveNews.countDocuments(query);

    // ✅ STRICT FILTER + LANGUAGE MAP
    const formattedData = liveNewsList
      .map(item => {
        const obj = item.toObject();

        // ❌ If selected language content missing → skip
        if (
          (lang === "hi" && !obj.title_hi && !obj.content_hi) ||
          (lang === "en" && !obj.title_en && !obj.content_en)
        ) {
          return null;
        }

        // 🟢 Always send Hindi keys
        if (lang === "en") {
          obj.title_hi = obj.title_en;
          obj.summary_hi = obj.summary_en;
          obj.content_hi = obj.content_en;

          delete obj.title_en;
          delete obj.summary_en;
          delete obj.content_en;
          delete obj.slug_en;
        }

        // 🟢 Updates language fix
        if (obj.updates?.length) {
          obj.updates = obj.updates.map(update => {
            if (lang === "en") {
              update.text_hi = update.text_en;
              delete update.text_en;
            }
            return update;
          });
        }

        return obj;
      })
      .filter(Boolean); // ❌ remove nulls

    res.status(200).json({
      success: true,
      message: "Live news fetched successfully",
      count: formattedData.length,
      total: totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / limit),
      data: formattedData,
    });
  } catch (error) {
    console.error("❌ Error fetching live news:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch live news",
      error: error.message,
    });
  }
};



export const endLiveNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    const liveNews = await LiveNews.findById(id)
      .populate("createdBy", "name email _id")
      .populate("category", "name_en name_hi")
      .populate("subCategory", "name_en name_hi");

    if (!liveNews) {
      return res.status(404).json({ success: false, message: "Live news not found" });
    }

    if (liveNews.status === "ended") {
      return res.status(400).json({ success: false, message: "Live news already ended" });
    }

    // -----------------------
    // 1) mark live as ended
    // -----------------------
    liveNews.status = "ended";
    liveNews.endedAt = new Date();
    liveNews.updatedBy = userId;
    await liveNews.save();

    // -----------------------
    // 2) Build combined content
    //    - media above text for each update
    //    - iterate in chronological order (oldest first)
    // -----------------------
    let combinedContentEn = "";
    let combinedContentHi = "";

    // Keep a flattened media array to store into News.media (coverImage first)
    const combinedMedia = [];

    // If coverImage exists, add to combinedMedia list (NOT to content strings)
    if (liveNews.coverImage?.url) {
      // Add to media list
      combinedMedia.push({
        url: liveNews.coverImage.url,
        type: "image",
        caption: liveNews.coverImage.alt_en || "",
      });

      // --- यह भाग हटा दिया गया है ताकि कवर इमेज का HTML सामग्री स्ट्रिंग में न जाए ---
      // const imgHtmlEn = `<div><img src="${liveNews.coverImage.url}" alt="${liveNews.coverImage.alt_en || ""}" style="max-width:100%;border-radius:6px;margin:10px 0" /></div>`;
      // const imgHtmlHi = `<div><img src="${liveNews.coverImage.url}" alt="${liveNews.coverImage.alt_hi || ""}" style="max-width:100%;border-radius:6px;margin:10px 0" /></div>`;
      // combinedContentEn += imgHtmlEn;
      // combinedContentHi += imgHtmlHi;
      // ---------------------------------------------------------------------------------
    }

    // Add initial content from liveNews as the first text block (if available)
    if (liveNews.content_en) {
      combinedContentEn += `<section style="margin-bottom:18px"><div>${liveNews.content_en}</div></section>`;
    }
    if (liveNews.content_hi) {
      combinedContentHi += `<section style="margin-bottom:18px"><div>${liveNews.content_hi}</div></section>`;
    }

    // updates array: note you used unshift when adding updates => newest first
    // We want chronological order (oldest first) for final article
    const updatesChrono = Array.isArray(liveNews.updates) ? [...liveNews.updates].reverse() : [];

    for (const update of updatesChrono) {
      // Add a wrapper for each update for better structure
      let blockEn = `<section style="margin-bottom:18px">`;
      let blockHi = `<section style="margin-bottom:18px">`;

      // 1) Media items first (if any)
      if (update.media && update.media.length > 0) {
        for (const m of update.media) {
          // Push to combinedMedia (so news.media contains all images/videos)
          combinedMedia.push({
            url: m.url,
            type: m.type || (m.url && m.url.includes(".mp4") ? "video" : "image"),
            caption: m.caption_en || m.caption || "",
          });

          // Live updates के मीडिया को content string में HTML के रूप में डालें
          // यह भाग अभी भी मीडिया को content_en/hi में जोड़ रहा है, जैसा कि आपने पहले चाहा था।
          if ((m.type || "").toLowerCase() === "video" || (m.url && (m.url.includes(".mp4") || m.url.includes("youtube")))) {
            // video tag
            blockEn += `<div style="margin:12px 0"><video controls style="max-width:100%;border-radius:6px"><source src="${m.url}" /></video>${m.caption_en ? `<div style="font-size:13px;margin-top:6px">${m.caption_en}</div>` : ""}</div>`;
            blockHi += `<div style="margin:12px 0"><video controls style="max-width:100%;border-radius:6px"><source src="${m.url}" /></video>${m.caption_hi ? `<div style="font-size:13px;margin-top:6px">${m.caption_hi}</div>` : ""}</div>`;
          } else {
            // image tag
            blockEn += `<div style="margin:12px 0"><img src="${m.url}" alt="${m.caption_en || ""}" style="max-width:100%;border-radius:6px" />${m.caption_en ? `<div style="font-size:13px;margin-top:6px">${m.caption_en}</div>` : ""}</div>`;
            blockHi += `<div style="margin:12px 0"><img src="${m.url}" alt="${m.caption_hi || ""}" style="max-width:100%;border-radius:6px" />${m.caption_hi ? `<div style="font-size:13px;margin-top:6px">${m.caption_hi}</div>` : ""}</div>`;
          }
        }
      }

      // 2) Then text (below media)
      if (update.text_en) {
        blockEn += `<div style="margin-top:8px">${update.text_en}</div>`;
      }
      if (update.text_hi) {
        blockHi += `<div style="margin-top:8px">${update.text_hi}</div>`;
      }

      blockEn += `</section>`;
      blockHi += `</section>`;

      combinedContentEn += blockEn;
      combinedContentHi += blockHi;
    }

    // -----------------------
    // 3) Create News document
    // -----------------------
    const newsPayload = {
      title_en: liveNews.title_en || "",
      title_hi: liveNews.title_hi || "",
      summary_en: liveNews.summary_en || "",
      summary_hi: liveNews.summary_hi || "",
      content_en: combinedContentEn || "",
      content_hi: combinedContentHi || "",
      category: liveNews.category || null,
      subCategory: liveNews.subCategory || null,
      country: liveNews.country || null,
      state: liveNews.state || null,
      city: liveNews.city || null,
      media: combinedMedia, // combined cover + all update media
      status: "posted", // published immediately
      createdBy: liveNews.createdBy,
      updatedBy: userId,
      publishedAt: new Date(),
      tags: liveNews.tags || [],
      referenceLinks: [], // optional - can fill if you want
    };

    const createdNews = await News.create(newsPayload);

    // Generate slug (prefer Hindi if available) and shareLink for createdNews
    const slugBase = (liveNews.title_hi?.trim() || liveNews.title_en?.trim() || "live-news").substring(0, 200);
    createdNews.slug_en = `${generateSlug(slugBase)}-${createdNews._id}`;
    // createdNews.shareLink = `https://news.aasmo.in/news/${createdNews.slug_en}`;
    createdNews.shareLink = `${BASE_URL}/news/${createdNews.slug_en}`;
    await createdNews.save();

    // -----------------------
    // 4) Return both results
    // -----------------------
    return res.status(200).json({
      success: true,
      message: "Live ended and converted to news successfully",
      data: {
        live: liveNews,
        news: createdNews,
      },
    });
  } catch (error) {
    console.error("❌ Error ending live and creating news:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to end live and create news",
      error: error.message,
    });
  }
};

// export const endLiveNews = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized user" });
//     }

//     const liveNews = await LiveNews.findById(id)
//       .populate("createdBy", "name email _id")
//       .populate("category", "name_en name_hi")
//       .populate("subCategory", "name_en name_hi");

//     if (!liveNews) {
//       return res.status(404).json({ success: false, message: "Live news not found" });
//     }

//     if (liveNews.status === "ended") {
//       return res.status(400).json({ success: false, message: "Live news already ended" });
//     }

//     // -----------------------
//     // 1) mark live as ended
//     // -----------------------
//     liveNews.status = "ended";
//     liveNews.endedAt = new Date();
//     liveNews.updatedBy = userId;
//     await liveNews.save();

//     // -----------------------
//     // 2) Build combined content
//     //    - media above text for each update
//     //    - iterate in chronological order (oldest first)
//     // -----------------------
//     let combinedContentEn = "";
//     let combinedContentHi = "";

//     // Keep a flattened media array to store into News.media (coverImage first)
//     const combinedMedia = [];

//     // If coverImage exists, add at top of article
//     if (liveNews.coverImage?.url) {
//       // Add to media list
//       combinedMedia.push({
//         url: liveNews.coverImage.url,
//         type: "image",
//         caption: liveNews.coverImage.alt_en || "",
//       });

//       // Add to both content versions as top element
//       const imgHtmlEn = `<div><img src="${liveNews.coverImage.url}" alt="${liveNews.coverImage.alt_en || ""}" style="max-width:100%;border-radius:6px;margin:10px 0" /></div>`;
//       const imgHtmlHi = `<div><img src="${liveNews.coverImage.url}" alt="${liveNews.coverImage.alt_hi || ""}" style="max-width:100%;border-radius:6px;margin:10px 0" /></div>`;
//       combinedContentEn += imgHtmlEn;
//       combinedContentHi += imgHtmlHi;
//     }

//     // --- START OF ADDITION ---
//     // Add initial content from liveNews as the first text block (if available)
//     if (liveNews.content_en) {
//       combinedContentEn += `<section style="margin-bottom:18px"><div>${liveNews.content_en}</div></section>`;
//     }
//     if (liveNews.content_hi) {
//       combinedContentHi += `<section style="margin-bottom:18px"><div>${liveNews.content_hi}</div></section>`;
//     }
//     // --- END OF ADDITION ---

//     // updates array: note you used unshift when adding updates => newest first
//     // We want chronological order (oldest first) for final article
//     const updatesChrono = Array.isArray(liveNews.updates) ? [...liveNews.updates].reverse() : [];

//     for (const update of updatesChrono) {
//       // Add a wrapper for each update for better structure
//       let blockEn = `<section style="margin-bottom:18px">`;
//       let blockHi = `<section style="margin-bottom:18px">`;

//       // 1) Media items first (if any)
//       if (update.media && update.media.length > 0) {
//         for (const m of update.media) {
//           // Push to combinedMedia (so news.media contains all images/videos)
//           combinedMedia.push({
//             url: m.url,
//             type: m.type || (m.url && m.url.includes(".mp4") ? "video" : "image"),
//             caption: m.caption_en || m.caption || "",
//           });

//           if ((m.type || "").toLowerCase() === "video" || (m.url && (m.url.includes(".mp4") || m.url.includes("youtube")))) {
//             // video tag
//             blockEn += `<div style="margin:12px 0"><video controls style="max-width:100%;border-radius:6px"><source src="${m.url}" /></video>${m.caption_en ? `<div style="font-size:13px;margin-top:6px">${m.caption_en}</div>` : ""}</div>`;
//             blockHi += `<div style="margin:12px 0"><video controls style="max-width:100%;border-radius:6px"><source src="${m.url}" /></video>${m.caption_hi ? `<div style="font-size:13px;margin-top:6px">${m.caption_hi}</div>` : ""}</div>`;
//           } else {
//             // image tag
//             blockEn += `<div style="margin:12px 0"><img src="${m.url}" alt="${m.caption_en || ""}" style="max-width:100%;border-radius:6px" />${m.caption_en ? `<div style="font-size:13px;margin-top:6px">${m.caption_en}</div>` : ""}</div>`;
//             blockHi += `<div style="margin:12px 0"><img src="${m.url}" alt="${m.caption_hi || ""}" style="max-width:100%;border-radius:6px" />${m.caption_hi ? `<div style="font-size:13px;margin-top:6px">${m.caption_hi}</div>` : ""}</div>`;
//           }
//         }
//       }

//       // 2) Then text (below media)
//       if (update.text_en) {
//         blockEn += `<div style="margin-top:8px">${update.text_en}</div>`;
//       }
//       if (update.text_hi) {
//         blockHi += `<div style="margin-top:8px">${update.text_hi}</div>`;
//       }

//       blockEn += `</section>`;
//       blockHi += `</section>`;

//       combinedContentEn += blockEn;
//       combinedContentHi += blockHi;
//     }

//     // -----------------------
//     // 3) Create News document
//     // -----------------------
//     const newsPayload = {
//       title_en: liveNews.title_en || "",
//       title_hi: liveNews.title_hi || "",
//       summary_en: liveNews.summary_en || "",
//       summary_hi: liveNews.summary_hi || "",
//       // Now combinedContentEn/Hi will correctly include initial content
//       content_en: combinedContentEn || "",
//       content_hi: combinedContentHi || "",
//       category: liveNews.category || null,
//       subCategory: liveNews.subCategory || null,
//       country: liveNews.country || null,
//       state: liveNews.state || null,
//       city: liveNews.city || null,
//       media: combinedMedia, // combined cover + all update media
//       status: "posted", // published immediately
//       createdBy: liveNews.createdBy,
//       updatedBy: userId,
//       publishedAt: new Date(),
//       tags: liveNews.tags || [],
//       referenceLinks: [], // optional - can fill if you want
//     };

//     const createdNews = await News.create(newsPayload);

//     // Generate slug (prefer Hindi if available) and shareLink for createdNews
//     const slugBase = (liveNews.title_hi?.trim() || liveNews.title_en?.trim() || "live-news").substring(0, 200);
//     createdNews.slug_en = `${generateSlug(slugBase)}-${createdNews._id}`;
//     createdNews.shareLink = `https://news.aasmo.in/news/${createdNews.slug_en}`;
//     await createdNews.save();

//     // -----------------------
//     // 4) Return both results
//     // -----------------------
//     return res.status(200).json({
//       success: true,
//       message: "Live ended and converted to news successfully",
//       data: {
//         live: liveNews,
//         news: createdNews,
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error ending live and creating news:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to end live and create news",
//       error: error.message,
//     });
//   }
// };


// export const endLiveNews = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized user" });
//     }

//     const liveNews = await LiveNews.findById(id)
//       .populate("createdBy", "name email _id")
//       .populate("category", "name_en name_hi")
//       .populate("subCategory", "name_en name_hi");

//     if (!liveNews) {
//       return res.status(404).json({ success: false, message: "Live news not found" });
//     }

//     if (liveNews.status === "ended") {
//       return res.status(400).json({ success: false, message: "Live news already ended" });
//     }

//     // -----------------------
//     // 1) mark live as ended
//     // -----------------------
//     liveNews.status = "ended";
//     liveNews.endedAt = new Date();
//     liveNews.updatedBy = userId;
//     await liveNews.save();

//     // -----------------------
//     // 2) Build combined content
//     //    - media above text for each update
//     //    - iterate in chronological order (oldest first)
//     // -----------------------
//     let combinedContentEn = "";
//     let combinedContentHi = "";

//     // Keep a flattened media array to store into News.media (coverImage first)
//     const combinedMedia = [];

//     // If coverImage exists, add at top of article
//     if (liveNews.coverImage?.url) {
//       // Add to media list
//       combinedMedia.push({
//         url: liveNews.coverImage.url,
//         type: "image",
//         caption: liveNews.coverImage.alt_en || "",
//       });

//       // Add to both content versions as top element
//       const imgHtmlEn = `<div><img src="${liveNews.coverImage.url}" alt="${liveNews.coverImage.alt_en || ""}" style="max-width:100%;border-radius:6px;margin:10px 0" /></div>`;
//       const imgHtmlHi = `<div><img src="${liveNews.coverImage.url}" alt="${liveNews.coverImage.alt_hi || ""}" style="max-width:100%;border-radius:6px;margin:10px 0" /></div>`;
//       combinedContentEn += imgHtmlEn;
//       combinedContentHi += imgHtmlHi;
//     }

//     // updates array: note you used unshift when adding updates => newest first
//     // We want chronological order (oldest first) for final article
//     const updatesChrono = Array.isArray(liveNews.updates) ? [...liveNews.updates].reverse() : [];

//     for (const update of updatesChrono) {
//       // Add a wrapper for each update for better structure
//       let blockEn = `<section style="margin-bottom:18px">`;
//       let blockHi = `<section style="margin-bottom:18px">`;

//       // 1) Media items first (if any)
//       if (update.media && update.media.length > 0) {
//         for (const m of update.media) {
//           // Push to combinedMedia (so news.media contains all images/videos)
//           combinedMedia.push({
//             url: m.url,
//             type: m.type || (m.url && m.url.includes(".mp4") ? "video" : "image"),
//             caption: m.caption_en || m.caption || "",
//           });

//           if ((m.type || "").toLowerCase() === "video" || (m.url && (m.url.includes(".mp4") || m.url.includes("youtube")))) {
//             // video tag
//             blockEn += `<div style="margin:12px 0"><video controls style="max-width:100%;border-radius:6px"><source src="${m.url}" /></video>${m.caption_en ? `<div style="font-size:13px;margin-top:6px">${m.caption_en}</div>` : ""}</div>`;
//             blockHi += `<div style="margin:12px 0"><video controls style="max-width:100%;border-radius:6px"><source src="${m.url}" /></video>${m.caption_hi ? `<div style="font-size:13px;margin-top:6px">${m.caption_hi}</div>` : ""}</div>`;
//           } else {
//             // image tag
//             blockEn += `<div style="margin:12px 0"><img src="${m.url}" alt="${m.caption_en || ""}" style="max-width:100%;border-radius:6px" />${m.caption_en ? `<div style="font-size:13px;margin-top:6px">${m.caption_en}</div>` : ""}</div>`;
//             blockHi += `<div style="margin:12px 0"><img src="${m.url}" alt="${m.caption_hi || ""}" style="max-width:100%;border-radius:6px" />${m.caption_hi ? `<div style="font-size:13px;margin-top:6px">${m.caption_hi}</div>` : ""}</div>`;
//           }
//         }
//       }

//       // 2) Then text (below media)
//       if (update.text_en) {
//         blockEn += `<div style="margin-top:8px">${update.text_en}</div>`;
//       }
//       if (update.text_hi) {
//         blockHi += `<div style="margin-top:8px">${update.text_hi}</div>`;
//       }

//       blockEn += `</section>`;
//       blockHi += `</section>`;

//       combinedContentEn += blockEn;
//       combinedContentHi += blockHi;
//     }

//     // -----------------------
//     // 3) Create News document
//     // -----------------------
//     const newsPayload = {
//       title_en: liveNews.title_en || "",
//       title_hi: liveNews.title_hi || "",
//       summary_en: liveNews.summary_en || "",
//       summary_hi: liveNews.summary_hi || "",
//       content_en: combinedContentEn || liveNews.content_en || "",
//       content_hi: combinedContentHi || liveNews.content_hi || "",
//       category: liveNews.category || null,
//       subCategory: liveNews.subCategory || null,
//       country: liveNews.country || null,
//       state: liveNews.state || null,
//       city: liveNews.city || null,
//       media: combinedMedia, // combined cover + all update media
//       status: "posted", // published immediately
//       createdBy: liveNews.createdBy,
//       updatedBy: userId,
//       publishedAt: new Date(),
//       tags: liveNews.tags || [],
//       referenceLinks: [], // optional - can fill if you want
//     };

//     const createdNews = await News.create(newsPayload);

//     // Generate slug (prefer Hindi if available) and shareLink for createdNews
//     const slugBase = (liveNews.title_hi?.trim() || liveNews.title_en?.trim() || "live-news").substring(0, 200);
//     createdNews.slug_en = `${generateSlug(slugBase)}-${createdNews._id}`;
//     createdNews.shareLink = `https://news.aasmo.in/news/${createdNews.slug_en}`;
//     await createdNews.save();

//     // -----------------------
//     // 4) Return both results
//     // -----------------------
//     return res.status(200).json({
//       success: true,
//       message: "Live ended and converted to news successfully",
//       data: {
//         live: liveNews,
//         news: createdNews,
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error ending live and creating news:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to end live and create news",
//       error: error.message,
//     });
//   }
// };