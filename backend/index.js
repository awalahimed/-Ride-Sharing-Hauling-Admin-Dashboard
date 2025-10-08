import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './configs/db.js';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import driverRouter from './routes/driverRoutes.js';
import userRouter from './routes/userRoutes.js';
import staffRouter from './routes/staffRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/drivers', driverRouter);
app.use('/api/users', userRouter);
app.use('/api/staff', staffRouter);
app.use('/api/dashboard', dashboardRouter);

// Root route
app.get('/', (req, res) => {
  res.send('EGREMENGED API - LETS RIDE TOGETHER');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});