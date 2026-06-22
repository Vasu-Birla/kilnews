import News from '../Models/news.model.js';
import Shorts from '../Models/shorts.model.js';
import User from '../Models/user.model.js';
import Poll from '../Models/poll.model.js';
import Company from "../Models/company.model.js";
import Ads from '../Models/ad.model.js';
import videoModel from "../Models/video.model.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    // एक साथ सभी काउंट्स निकालने के लिए Promise.all का उपयोग
    const [
      totalNews,
      pendingNews,
      totalShorts,
      totalPolls,
      totalUsers,
      totalReporters,
      totalAdmins,
      totalCompanies,
      pendingCompanies,
      activeAds,
      totalVideos,
      // पिछले 24 घंटों की न्यूज़ के लिए
      newNewsToday
    ] = await Promise.all([
      News.countDocuments({}),
      News.countDocuments({ status: 'pending_approval' }),
      Shorts.countDocuments({}),
      Poll.countDocuments({}),
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'reporter' }),
      User.countDocuments({ role: 'admin' }),
      Company.countDocuments({ isApproved: true }),
      Company.countDocuments({ isApproved: false }),
      Ads.countDocuments({ isActive: true }),
      videoModel.countDocuments({}),
      News.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
    ]);

    // व्यूज (Views) का समरी निकालने के लिए (Aggregation)
    const newsViews = await News.aggregate([
      { $group: { _id: null, total: { $sum: "$viewsCount" } } }
    ]);

    const shortsViews = await Shorts.aggregate([
      { $group: { _id: null, total: { $sum: "$viewsCount" } } }
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: {
        summary: {
          news: {
            total: totalNews,
            pending: pendingNews,
            today: newNewsToday,
            totalViews: newsViews[0]?.total || 0
          },
          shorts: {
            total: totalShorts,
            totalViews: shortsViews[0]?.total || 0
          },
          users: {
            totalUsers: totalUsers,
            reporters: totalReporters,
            admins: totalAdmins
          },
          engagement: {
            polls: totalPolls,
            videos: totalVideos
          },
          business: {
            approvedCompanies: totalCompanies,
            pendingApprovals: pendingCompanies,
            activeAds: activeAds
          }
        }
      }
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};