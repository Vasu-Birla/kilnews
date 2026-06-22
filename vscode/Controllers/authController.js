import { uploadFileToSpaces, deleteFileFromSpaces } from '../Services/s3Service.js';
import { STATUS_CODES, MESSAGES } from '../Utils/status.codes.messages.js';
import User from '../Models/user.model.js';
import { getTokenForUser } from '../Utils/tokenUtils.js';
import { ApiError } from '../Utils/apiError.js';

// Super Admin, Admin, User Registration====================================================================== 
export const registerUser = async (req, res, next) => {
    const {
        name,
        email,
        password,
        role,
        country,
        state,
        city,
        address,
        dateOfBirth,
        canDirectPost,
        canDirectGoLive
    } = req.body;

    const profileImageFile = req.file;
    let profileImageUrl = null;
    const convertToBoolean = (val) => val === true || val === 'true';

    try {
        if (!name || !email || !password) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, "Name, email, and password are required.");
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ApiError(STATUS_CODES.CONFLICT, MESSAGES.EMAIL_ALREADY_EXISTS);
        }

        if (profileImageFile) {
            profileImageUrl = await uploadFileToSpaces(profileImageFile, 'profile-images');
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
            profileImage: profileImageUrl,
            country,
            state,
            city,
            address,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            canDirectPost: convertToBoolean(canDirectPost),
            canDirectGoLive: convertToBoolean(canDirectGoLive),
        });

        res.status(STATUS_CODES.CREATED).json({
            message: MESSAGES.REGISTRATION_SUCCESS,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                country: user.country,
                state: user.state,
                city: user.city,
                address: user.address,
                dateOfBirth: user.dateOfBirth,
                canDirectPost: user.canDirectPost,
                canDirectGoLive: user.canDirectGoLive,
                accessToken: getTokenForUser(user),
            }
        });

    } catch (error) {
        if (profileImageUrl) {
            await deleteFileFromSpaces(profileImageUrl);
        }
        next(error);
    }
};




// Super Admin, Admin, User Login============================================================================= 
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.INVALID_CREDENTIALS });
//         }

//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) {
//             return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.INVALID_CREDENTIALS });
//         }

//         res.status(STATUS_CODES.SUCCESS).json({
//             message: MESSAGES.LOGIN_SUCCESS,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 profileImage: user.profileImage,
//                 country: user.country,
//                 state: user.state,
//                 city: user.city,
//                 address: user.address,
//                 dateOfBirth: user.dateOfBirth,
//                 canDirectPost: user.canDirectPost,
//                 canDirectGoLive: user.canDirectGoLive,
//             },
//             token: getTokenForUser(user),
//         });

//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
//     }
// };

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password'); // 👈 FIXED

        if (!user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.INVALID_CREDENTIALS });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.INVALID_CREDENTIALS });
        }

        res.status(STATUS_CODES.SUCCESS).json({
            message: MESSAGES.LOGIN_SUCCESS,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                country: user.country,
                state: user.state,
                city: user.city,
                address: user.address,
                dateOfBirth: user.dateOfBirth,
                canDirectPost: user.canDirectPost,
                canDirectGoLive: user.canDirectGoLive,
                companyRegistered:user.companyRegistered,
                
            },
            token: getTokenForUser(user), // ✅ token generation function
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
};


export const updateProfile = async (req, res, next) => {
    const userId = req.user.id; // authenticate middleware se user id mil jayegi
    const {
        name,
        email,
        country,
        state,
        city,
        address,
        dateOfBirth
    } = req.body;

    const profileImageFile = req.file;
    let newProfileImageUrl = null;

    try {
        // 1. User ko find karein
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, "User not found.");
        }

        // 2. Agar email change ho raha hai toh check karein unique hai ya nahi
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                throw new ApiError(STATUS_CODES.CONFLICT, MESSAGES.EMAIL_ALREADY_EXISTS);
            }
            user.email = email;
        }

        // 3. Profile Image handling
        if (profileImageFile) {
            // Purani image delete karein agar exist karti hai
            if (user.profileImage) {
                await deleteFileFromSpaces(user.profileImage);
            }
            // Nayi image upload karein
            newProfileImageUrl = await uploadFileToSpaces(profileImageFile, 'profile-images');
            user.profileImage = newProfileImageUrl;
        }

        // 4. Baki fields update karein
        if (name) user.name = name;
        if (country) user.country = country;
        if (state) user.state = state;
        if (city) user.city = city;
        if (address) user.address = address;
        if (dateOfBirth) user.dateOfBirth = new Date(dateOfBirth);

        // Save the updated user
        await user.save();

        res.status(STATUS_CODES.SUCCESS).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                country: user.country,
                state: user.state,
                city: user.city,
                address: user.address,
                dateOfBirth: user.dateOfBirth,
                companyRegistered: user.companyRegistered
            }
        });

    } catch (error) {
        // Agar image upload ho gayi par DB update fail hua, toh upload ki hui image delete karein
        if (newProfileImageUrl) {
            await deleteFileFromSpaces(newProfileImageUrl);
        }
        next(error);
    }
};