import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { connectToMongoDB } from './services/mongoConnection.js';

dotenv.config();
const app = express();
const APP_PORT = 8888;

app.use(cors({ origin: true }));
app.use(express.json());

app.use(async (req, res, next) => {
  req.db = await connectToMongoDB();
  next();
});

app.use('/api', userRoutes);

app.listen(APP_PORT, () => {
  console.log(`API listening at http://localhost:${APP_PORT}`);
});
