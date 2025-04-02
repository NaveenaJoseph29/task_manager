import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import { asyncHandler, errorResponse } from "../utils/errorHandler.js";

// Token Generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// ─── Signup ───────────────────────────────────────────────────────────────────
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return errorResponse(res, 400, "User already exists");
  }

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user,
  });
});

// ─── Login ────────────────────────────────────────────────────────────────────
export const login = asyncHandler(async (req, res) => {
  console.log("Login request received:", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, 401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return errorResponse(res, 401, "Invalid credentials");
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user,
  });
});

// ─── Forgot Password ──────────────────────────────────────────────────────────
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return errorResponse(res, 404, "User not found");

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });

  res.json({ success: true, message: "Password reset email sent!" });
});

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return errorResponse(res, 400, "Invalid token or user");

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ success: true, message: "Password reset successful!" });
  } catch (error) {
    return errorResponse(res, 500, "Invalid or expired token");
  }
});

// ─── Get User Profile ─────────────────────────────────────────────────────────
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return errorResponse(res, 404, "User not found");
  }

  res.json({ success: true, user });
});
