import express from 'express';
import {getAllPosts, getAPost, createPost, updatePost, deletePost} from '../controllers/postController.js'
import { authorizeAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

//USER
router.get('/posts', getAllPosts);
router.get('/posts/:postId', getAPost)

//ADMIN
router.post('/posts', authorizeAdmin, createPost);
router.put('/posts/:id', authorizeAdmin, updatePost);
router.delete('/posts/:id', authorizeAdmin, deletePost);

export default router;