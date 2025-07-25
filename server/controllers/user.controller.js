import { generateToken } from "../generateToken.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

// Signup new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return (res.json = { success: false, message: "missing details" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.json({
                success: false,
                message: "Account already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio,
        });

        const token = generateToken(newUser._id);

        res.json({
            success: true,
            userData: newUser,
            token,
            message: "Account Created Successfully",
        });
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message });
    }
};

// To log a user in

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            userData.password
        );

        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Invalid credentials, please try again",
            });
        }

        const token = generateToken(userData._id);

        res.json({
            success: true,
            userData,
            token,
            message: "Login successful",
        });
    } catch (error) {
        console.log("Error logging in!!!");

        res.json({ success: false, message: error.message });
    }
};

// to check whether the user is authed or not

export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
};

// update user profile detail

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        let updateUser;

        if (!profilePic) {
            updateUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updateUser = await User.findByIdAndUpdate(
                userId,
                { profilePic: upload.secure_url, bio, fullName },
                { new: true }
            );
        }

        res.json({ success: true, user: updateUser });
    } catch (error) {
        console.log(`updating error: ${error.message}`);
        res.json({ success: false, message: error.message });
    }
};
