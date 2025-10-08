import User from '../models/usermodel.js';
import bcrypt from 'bcrypt';

// Get all staff members
export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find().select('-Password');
    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single staff member
export const getStaffById = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id).select('-Password');
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new staff member
export const createStaff = async (req, res) => {
  try {
    const { username, name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Username or email already exists'
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = await User.create({
      username,
      name,
      email,
      Password: hashedPassword,
      role: role || 'Staff'
    });
    
    // Remove password from response
    const userResponse = { ...user.toObject() };
    delete userResponse.Password;
    
    res.status(201).json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// Update staff member
export const updateStaff = async (req, res) => {
  try {
    // Don't allow password updates through this endpoint
    const { Password, ...updateData } = req.body;
    
    const staff = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    }).select('-Password');
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete staff member
export const deleteStaff = async (req, res) => {
  try {
    const staff = await User.findByIdAndDelete(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};