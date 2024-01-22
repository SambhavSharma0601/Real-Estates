  import express from 'express';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import userRouter from './routes/user.route.js';
  import authRouter from './routes/auth.route.js';
  import listingRouter from './routes/listing.route.js';
  import cookieParser from 'cookie-parser';
  import path from 'path';
  import cors from 'cors';
  // import { verifyToken } from './utils/verifyUser.js';

  dotenv.config();

  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to MongoDB!');
    })
    .catch((err) => {
      console.log(err);
    });

    const __dirname = path.resolve();

  const app = express();

  
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.listen(3001, () => {
    console.log('Server is running on port 3001!');
  });


  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/listing', listingRouter);

  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })

  app.use((err, req, res, next) => {
    // console.log(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || ' Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
