import userModel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// LOGIN ONLY – no signup
export const Login = async (req, res) => {
  try {
    const { email, Password } = req.body;

    if (!email || !Password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        error: true,
      });
    }

    // Check if admin exists in DB
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
        error: true,
      });
    }

    // Compare password with hash in DB
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
        error: true,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "Admin logged in successfully",
      success: true,
      error: false,
      token: token,
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Error in Login",
      success: false,
      error: true,
    });
  }
};
