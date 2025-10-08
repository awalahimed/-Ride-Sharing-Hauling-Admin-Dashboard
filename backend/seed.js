import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import userModel from './models/usermodel.js';

dotenv.config();

connectDB();

const seedUsers = async () => {
  try {
    await userModel.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword', salt);

    const adminUser = new userModel({
      name: 'Admin User',
      username: 'admin',
      email: 'admin@example.com',
      Password: hashedPassword,
      role: 'Admin',
    });

    await adminUser.save();

    console.log('Admin user created!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedUsers();