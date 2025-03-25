import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler, errorResponse } from "../utils/errorHandler.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return errorResponse(res, 400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user,
  });
});


export const login = asyncHandler(async (req, res) => {
  console.log("Login request received:", req.body); 
  const { email, password } = req.body;


  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, 401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

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

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return errorResponse(res, 404, "User not found");
  }

  res.json({
    success: true,
    user,
  });
});
