import express from 'express';
import { authenticate } from './middlewares/authMiddleware.js';
import { getProfile } from './controllers/authController.js';
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoute.js'

const app = express();

app.use(express.json());

app.get("/profile", authenticate, getProfile);
app.use("/auth", authRoutes);
app.use("/blogs", postRoutes);
app.use("/comments", commentRoutes);

export default app;