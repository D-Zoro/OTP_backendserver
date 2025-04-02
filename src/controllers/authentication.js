import OTPmailer from "../utils/sendotp.js"
import User from "../models/user.js";
import OTP from "../models/otp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user)=> {
    return jwt.sign({
        id: user._id, 
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

const verifyotp_reg = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the OTP record in the database
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP is valid, delete it from the database
        await OTP.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export { verifyotp_reg };

const registerUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

        // Save OTP to the database
        const otpEntry = new OTP({
            email,
            otp,
        });
        await otpEntry.save();

        // Send OTP via email
        await OTPmailer(email, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export { registerUser };

const completeRegistration = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate a token for the user
        const token = generateToken(newUser);

        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export { completeRegistration };