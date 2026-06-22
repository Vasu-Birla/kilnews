

import Poll from '../Models/poll.model.js';
import { ApiError } from '../Utils/apiError.js';
import { STATUS_CODES, MESSAGES } from '../Utils/status.codes.messages.js';



export const createPoll = async (req, res, next) => {
  try {
    const {
      question,
      options,
      start_date,
      end_date,
      visibility,
      category,
      subCategory,
      country,
      state,
      city,
    } = req.body;

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return next(new ApiError(STATUS_CODES.BAD_REQUEST, 'Poll must have a question and at least 2 options.'));
    }

    if (!start_date || !end_date) {
      return next(new ApiError(STATUS_CODES.BAD_REQUEST, 'Start and end dates are required.'));
    }

    const formattedOptions = options.map(option => ({
      text: typeof option === "string" ? option : option.text,
      votes: 0,
    }));

    const newPoll = await Poll.create({
      question,
      options: formattedOptions,
      start_date,
      end_date,
      visibility,
      category: category || null,
      subCategory: subCategory || null,
      country: country || null,
      state: state || null,
      city: city || null,
      created_by: req?.admin?._id,
    });

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: 'Poll created successfully.',
      data: newPoll,
    });
  } catch (error) {
    next(error);
  }
};


// export const getAllPolls = async (req, res, next) => {
//   try {
//     const userId = req.user?._id;

//     const now = new Date();

//     let polls = await Poll.find({
//       start_date: { $lte: now },  // अभी तक शुरू हो चुका हो
//       end_date: { $gt: now } ,     // अभी तक ख़त्म ना हुआ हो
//        isActive: true   
//     })
//       .populate('category', 'name') 
//       .populate('subCategory', 'name')
//       .populate('created_by', 'name email')
//       .lean();

//     // Add custom field: hasVoted
//     polls = polls.map(poll => {
//       const hasVoted = poll.votes?.some(
//         vote => vote.user.toString() === userId.toString()
//       ) || false;

//       return {
//         ...poll,
//         hasVoted,
//       };
//     });

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       message: 'Polls fetched successfully.',
//       data: polls,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


export const getAllPolls = async (req, res, next) => {
  try {
    const userId = req.user?._id || null;
    const now = new Date();

    let polls = await Poll.find({
      start_date: { $lte: now },
      end_date: { $gt: now },
      isActive: true,
    })
      .populate('category', 'name')
      .populate('subCategory', 'name')
      .populate('created_by', 'name email')
      .lean();

    polls = polls.map(poll => {

      let hasVoted = false;

      if (userId && Array.isArray(poll.votes)) {
        hasVoted = poll.votes.some(v =>
          v?.user && v.user.toString() === userId.toString()
        );
      }

      return {
        ...poll,
        hasVoted,
      };
    });

    res.status(200).json({
      success: true,
      message: "Polls fetched successfully",
      data: polls,
    });

  } catch (error) {
    next(error);
  }
};

export const getAllPollsAdmin = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    let polls = await Poll.find() // ⚡ koi filter nahi, sabhi polls
      .populate('category', 'name') 
      .populate('subCategory', 'name') 
      .populate('created_by', 'name email')
      .populate( 'country',  'name iso2' )
           .populate ( 'state',  'name iso2')
           .populate ( 'city',  'name' )
      .lean();

    // Add custom field: hasVoted
    polls = polls.map(poll => {
  const hasVoted = poll.votes.some(vote => {
    if (!vote.user || !userId) return false;
    return vote.user.toString() === userId.toString();
  });

  return {
    ...poll,
    hasVoted,
  };
}); 

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: 'All polls fetched successfully.',
      data: polls,
    });
  } catch (error) {
    next(error);
  }
};


// Get poll by ID
export const getPollById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);
    if (!poll) {
      return next(new ApiError(STATUS_CODES.NOT_FOUND, 'Poll not found.'));
    }

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      data: poll,
    });
  } catch (error) {
    next(error);
  }
};


// export const voteOnPoll = async (req, res, next) => {
//   try {
//     const { id } = req.params; // poll ID
//     const { optionIndex } = req.body;
//     const userId = req.user?._id; // from authenticate middleware

//     if (!userId) {
//       return next(new ApiError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED));
//     }

//     const poll = await Poll.findById(id);
//     if (!poll) {
//       return next(new ApiError(STATUS_CODES.NOT_FOUND, 'Poll not found.'));
//     }

//     if (!poll.isActive) {
//       return next(new ApiError(STATUS_CODES.BAD_REQUEST, 'This poll is not active.'));
//     }

//     if (optionIndex < 0 || optionIndex >= poll.options.length) {
//       return next(new ApiError(STATUS_CODES.BAD_REQUEST, 'Invalid option index.'));
//     }

//     // Check if user has already voted
//     const existingVote = poll.votes.find(v => v.user.toString() === userId.toString());

//     if (existingVote) {
//       // Remove vote from previous option
//       if (typeof existingVote.optionIndex === 'number') {
//         poll.options[existingVote.optionIndex].votes -= 1;
//       }

//       // Update vote entry
//       existingVote.optionIndex = optionIndex;
//       existingVote.votedAt = new Date();
//     } else {
//       // New voter — add vote record
//       poll.votes.push({ user: userId, optionIndex, votedAt: new Date() });
//     }

//     // Add vote to selected option
//     poll.options[optionIndex].votes += 1;

//     // Update totalVotes (recalculate fresh)
//     poll.totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

//     await poll.save();

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       message: 'Vote recorded successfully.',
//       data: poll,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const voteOnPoll = async (req, res, next) => {
  try {

    const { id } = req.params;
    const { optionIndex, deviceId } = req.body;
    const userId = req.user?._id;

    if (!deviceId) {
      return next(new ApiError(400, "Device identifier missing"));
    }

    const poll = await Poll.findById(id);

    if (!poll) {
      return next(new ApiError(404, "Poll not found"));
    }

    if (!poll.isActive) {
      return next(new ApiError(400, "Poll not active"));
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return next(new ApiError(400, "Invalid option"));
    }

    // 🔥 find vote by device OR user
    const existingVote = poll.votes.find(v => {

      if (v.deviceId && v.deviceId === deviceId) {
        return true;
      }

      if (userId && v.user && v.user.toString() === userId.toString()) {
        return true;
      }

      return false;

    });

    if (existingVote) {

      if (typeof existingVote.optionIndex === "number") {
        poll.options[existingVote.optionIndex].votes -= 1;
      }

      existingVote.optionIndex = optionIndex;
      existingVote.votedAt = new Date();

      // guest vote ko login user se attach kar do
      if (userId && !existingVote.user) {
        existingVote.user = userId;
      }

    } else {

      poll.votes.push({
        user: userId || null,
        deviceId,
        optionIndex,
        votedAt: new Date()
      });

    }

    poll.options[optionIndex].votes += 1;

    poll.totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

    await poll.save();

    res.status(200).json({
      success: true,
      message: "Vote recorded successfully",
      data: poll
    });

  } catch (error) {
    next(error);
  }
};

// export const voteOnPoll = async (req, res, next) => {
//   try {

//     const { id } = req.params;
//     const { optionIndex, deviceId } = req.body;
//     const userId = req.user?._id;

//     if (!deviceId) {
//       return next(new ApiError(400, "Device identifier missing"));
//     }

//     const poll = await Poll.findById(id);

//     if (!poll) {
//       return next(new ApiError(404, "Poll not found"));
//     }

//     if (!poll.isActive) {
//       return next(new ApiError(400, "Poll not active"));
//     }

//     if (optionIndex < 0 || optionIndex >= poll.options.length) {
//       return next(new ApiError(400, "Invalid option"));
//     }

//     // 🔥 Check existing vote
//     const existingVote = poll.votes.find(v => {

//       if (userId && v.user) {
//         return v.user.toString() === userId.toString();
//       }

//       if (!userId && v.deviceId) {
//         return v.deviceId === deviceId;
//       }

//       return false;

//     });

//     if (existingVote) {

//       if (typeof existingVote.optionIndex === "number") {
//         poll.options[existingVote.optionIndex].votes -= 1;
//       }

//       existingVote.optionIndex = optionIndex;
//       existingVote.votedAt = new Date();

//     } else {

//       poll.votes.push({
//         user: userId || null,
//         deviceId,
//         optionIndex,
//         votedAt: new Date()
//       });

//     }

//     poll.options[optionIndex].votes += 1;

//     poll.totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

//     await poll.save();

//     res.status(200).json({
//       success: true,
//       message: "Vote recorded successfully",
//       data: poll
//     });

//   } catch (error) {
//     next(error);
//   }
// };
// export const getPollResults = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const poll = await Poll.findById(id).populate("votes.user", "name email");
//     if (!poll) {
//       return next(new ApiError(STATUS_CODES.NOT_FOUND, "Poll not found."));
//     }

//     // ✅ Calculate total votes
//     const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

//     // ✅ Prepare results
//     const results = poll.options.map((option, index) => {
//       // कौन-कौन से users ने इस option को vote किया
//       const voters = poll.votes
//         .filter(v => v.optionIndex === index)
//         .map(v => ({
//           userId: v.user._id,
//           name: v.user.name,
//           email: v.user.email,
//           votedAt: v.votedAt,
//         }));

//       return {
//         text: option.text,
//         votes: option.votes,
//         percentage:
//           totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(2) : "0.00",
//         voters,
//       };
//     });

//     res.status(STATUS_CODES.SUCCESS).json({
//       success: true,
//       message: "Poll results fetched successfully",
//       data: {
//         question: poll.question,
//         totalVotes,
//         results,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


export const getPollResults = async (req, res, next) => {
  try {

    const { id } = req.params;

    const poll = await Poll.findById(id).populate("votes.user", "name email");

    if (!poll) {
      return next(new ApiError(404, "Poll not found."));
    }

    const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

    const results = poll.options.map((option, index) => {

      const voters = poll.votes
        .filter(v => v.optionIndex === index)
        .map(v => ({
          userId: v.user ? v.user._id : null,
          name: v.user ? v.user.name : "Guest User",
          email: v.user ? v.user.email : null,
          deviceId: v.deviceId || null,
          votedAt: v.votedAt,
        }));

      return {
        text: option.text,
        votes: option.votes,
        percentage: totalVotes > 0
          ? ((option.votes / totalVotes) * 100).toFixed(2)
          : "0.00",
        voters,
      };

    });

    res.status(200).json({
      success: true,
      message: "Poll results fetched successfully",
      data: {
        question: poll.question,
        totalVotes,
        results,
      },
    });

  } catch (error) {
    next(error);
  }
};
export const deactivatePoll = async (req, res, next) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);
    if (!poll) return next(new ApiError(STATUS_CODES.NOT_FOUND, 'Poll not found'));

    poll.isActive = false;
    await poll.save();

    res.status(STATUS_CODES.SUCCESS).json({ success: true, message: 'Poll deactivated' });
  } catch (error) {
    next(error);
  }
};


export const deletePoll = async (req, res, next) => {
  try {
    const { id } = req.params; // poll id from URL

    const poll = await Poll.findById(id);
    if (!poll) {
      return next(new ApiError(STATUS_CODES.NOT_FOUND, "Poll not found."));
    }

    await Poll.findByIdAndDelete(id);

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Poll deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};


// ✅ Update Poll API
export const updatePoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      question,
      options,
      isActive,
      visibility,
      start_date,
      end_date,
      category,
      subCategory,
      country,
      state,
      city,
    } = req.body;

    const poll = await Poll.findById(id);
    if (!poll) {
      return next(new ApiError(404, "Poll not found"));
    }

    // ✅ Ensure options are always array with at least 2
    let finalOptions = poll.options; // old options by default
    if (options && Array.isArray(options)) {
      finalOptions = options
        .map((opt) => {
          if (typeof opt === "string") {
            return { text: opt.trim(), votes: 0 }; // string → object
          }
          if (typeof opt === "object" && opt.text) {
            return { text: opt.text.trim(), votes: opt.votes || 0 };
          }
          return null;
        })
        .filter(Boolean);
    }

    if (!finalOptions || finalOptions.length < 2) {
      return next(new ApiError(400, "At least 2 options are required"));
    }

    // ✅ Update fields
    poll.question   = question   || poll.question;
    poll.options    = finalOptions;
    poll.isActive   = isActive !== undefined ? isActive : poll.isActive;
    poll.visibility = visibility || poll.visibility;
    poll.start_date = start_date || poll.start_date;
    poll.end_date   = end_date   || poll.end_date;
    poll.category   = category   || poll.category;
    poll.subCategory = subCategory || poll.subCategory;

    // ✅ Location fields
    poll.country = country || poll.country;
    poll.state   = state   || poll.state;
    poll.city    = city    || poll.city;

    await poll.save();

    res.status(200).json({
      success: true,
      message: "Poll updated successfully",
      data: poll,
    });
  } catch (error) {
    next(error);
  }
};

