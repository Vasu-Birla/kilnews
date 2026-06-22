// Controllers/ad.controller.js
import Ads from '../Models/ad.model.js';
import { uploadFileToSpaces, deleteFileFromSpaces } from '../Services/s3Service.js';
import { STATUS_CODES, MESSAGES } from '../Utils/status.codes.messages.js';

// Helper to convert boolean string ('true'/'false') to actual boolean
const convertToBoolean = (val) => val === true || val === 'true';

// Create Ad

const SINGLE_AD_POSITIONS = ["top", "bottom", "popup", "inline", "inline2" , "inlineLarge"];

// export const createAd = async (req, res) => {
//   try {
//     const { type, position, link, title, mediaType } = req.body;

//     let mediaUrl = null;
//     if (type === 'custom' && req.file) {
//       mediaUrl = await uploadFileToSpaces(req.file, 'ads');
//     }

//     // Deactivate all existing active ads for this position before creating a new active one
//     // This ensures only one ad is active per position at any given time.
//     await Ads.updateMany({ position, isActive: true }, { isActive: false });

//     const newAd = await Ads.create({
//       type,
//       position,
//       link: type === 'google' ? link : null,
//       title: type === 'custom' ? title : null,
//       mediaType: type === 'custom' ? mediaType : null,
//       mediaUrl: mediaUrl || null,
//       isActive: true // New ad is always created as active
//     });

//     res.status(STATUS_CODES.CREATED).json({ success: true, ad: newAd });
//   } catch (err) {
//     // If upload was successful but DB creation failed, clean up the uploaded file
//     if (req.file && req.file.location) {
//         await deleteFileFromSpaces(req.file.location).catch(cleanupErr => console.error("Failed to clean up uploaded ad media after DB error:", cleanupErr));
//     }
//     res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
//   }
// };

// Get All Ads (for Admin, fetches all active and inactive)

export const createAd = async (req, res) => {
  try {
    const { type, position, link, title, mediaType, categories } = req.body;

    let mediaUrl = null;
    if (type === 'custom' && req.file) {
      mediaUrl = await uploadFileToSpaces(req.file, 'ads');
    }

    // ✅ ONLY single-ad positions auto deactivate
    if (SINGLE_AD_POSITIONS.includes(position)) {
      await Ads.updateMany(
        { position, isActive: true },
        { isActive: false }
      );
    }

    const newAd = await Ads.create({
      type,
      position,
      categories: categories?.length ? categories : ["home"],
      link: type === 'google' ? link : null,
      title: type === 'custom' ? title : null,
      mediaType: type === 'custom' ? mediaType : null,
      mediaUrl,
      isActive: true
    });

    res.status(201).json({ success: true, ad: newAd });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const ads = await Ads.find().sort({ createdAt: -1 });
    res.status(STATUS_CODES.SUCCESS).json({ success: true, ads });
  } catch (err) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
  }
};


// ✅ हेल्पर फंक्शन: डेटा को हमेशा Array में बदलने के लिए
const normalizeCategories = (cats) => {
  if (!cats) return ["home"];
  if (Array.isArray(cats)) return cats;
  return [cats]; // अगर सिंगल स्ट्रिंग है तो ऐरे में बदलें
};

export const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ads.findById(id);
    if (!ad) return res.status(404).json({ success: false, message: "Ad not found" });

    // FormData में 'categories[]' नाम से डेटा आता है
    const {
      type,
      position,
      link,
      title,
      mediaType,
      isActive,
    } = req.body;
    
    // FormData से आने वाले categories को सही से पकड़ना
    const categoriesRaw = req.body.categories || req.body['categories[]'];
    const categories = normalizeCategories(categoriesRaw);

    let mediaUrl = ad.mediaUrl;
    const filesToDelete = [];

    if (ad.type === "custom" && type === "google" && mediaUrl) {
      filesToDelete.push(mediaUrl);
      mediaUrl = null;
    }

    if (type === "custom" && req.file) {
      if (mediaUrl) filesToDelete.push(mediaUrl);
      mediaUrl = await uploadFileToSpaces(req.file, "ads");
    }

    const newIsActive = convertToBoolean(isActive);

    if (newIsActive && SINGLE_AD_POSITIONS.includes(position)) {
      await Ads.updateMany(
        { position, isActive: true, _id: { $ne: id } },
        { isActive: false }
      );
    }

    // अपडेट करें
    ad.type = type;
    ad.position = position;
    ad.categories = categories;
    ad.link = type === "google" ? link : null;
    ad.title = type === "custom" ? title : null;
    ad.mediaType = type === "custom" ? mediaType : null;
    ad.mediaUrl = type === "custom" ? mediaUrl : null;
    ad.isActive = newIsActive;

    await ad.save();

    for (const url of filesToDelete) {
      await deleteFileFromSpaces(url).catch(() => console.warn("Old media delete failed"));
    }

    res.status(200).json({ success: true, message: "Ad updated successfully", ad });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// export const updateAd = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const ad = await Ads.findById(id);
//     if (!ad) {
//       return res.status(404).json({ success: false, message: "Ad not found" });
//     }

//     const {
//       type,
//       position,
//       link,
//       title,
//       mediaType,
//       isActive,
//       categories
//     } = req.body;

//     let mediaUrl = ad.mediaUrl;
//     const filesToDelete = [];

//     /* 🔁 TYPE CHANGE HANDLING */

//     // Custom ➝ Google (delete old media)
//     if (ad.type === "custom" && type === "google" && mediaUrl) {
//       filesToDelete.push(mediaUrl);
//       mediaUrl = null;
//     }

//     // Custom ➝ Custom (replace media)
//     if (type === "custom" && req.file) {
//       if (mediaUrl) filesToDelete.push(mediaUrl);
//       mediaUrl = await uploadFileToSpaces(req.file, "ads");
//     }

//     const newIsActive = convertToBoolean(isActive);

//     /* 🚫 SINGLE POSITION LOGIC */
//     if (newIsActive && SINGLE_AD_POSITIONS.includes(position)) {
//       await Ads.updateMany(
//         { position, isActive: true, _id: { $ne: id } },
//         { isActive: false }
//       );
//     }

//     /* ✅ UPDATE FIELDS */
//     ad.type = type;
//     ad.position = position;
//     ad.categories = normalizeCategories(categories);

//     ad.link = type === "google" ? link : null;
//     ad.title = type === "custom" ? title : null;
//     ad.mediaType = type === "custom" ? mediaType : null;
//     ad.mediaUrl = type === "custom" ? mediaUrl : null;

//     ad.isActive = newIsActive;

//     await ad.save();

//     /* 🧹 CLEAN OLD FILES */
//     for (const url of filesToDelete) {
//       await deleteFileFromSpaces(url).catch(() =>
//         console.warn("Old ad file delete failed")
//       );
//     }

//     res.status(200).json({
//       success: true,
//       message: "Ad updated successfully",
//       ad
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     });
//   }
// };

// Delete Ad
export const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ads.findById(id);
    if (!ad) return res.status(STATUS_CODES.NOT_FOUND).json({ success: false, message: 'Ad not found' });

    if (ad.mediaUrl) {
      await deleteFileFromSpaces(ad.mediaUrl);
    }

    await ad.deleteOne();

    res.status(STATUS_CODES.SUCCESS).json({ success: true, message: 'Ad deleted successfully' });
  } catch (err) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
  }
};



// export const getActiveAds = async (req, res) => {
//   try {
//     const { position, category } = req.query;

//     const filter = {
//       isActive: true,
//       position,
//       categories: { $in: [category, "home"] }
//     };

//     const ads = await Ads.find(filter)
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: ads.length,
//       ads
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const getActiveAds = async (req, res) => {
  
  try {
    const { position, category } = req.query;

    const filter = { isActive: true };
    if (position) filter.position = position;
       if (category) {
      filter.categories = { $in: [category] };
    }

    const ads = await Ads.find(filter)
      .select("type position categories link title mediaType mediaUrl")
      .sort({ createdAt: -1 });

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      count: ads.length,
      ads
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    });
  }
};