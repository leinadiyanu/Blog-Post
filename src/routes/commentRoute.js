import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {deleteComment, editComment, getAllComments, postComment, postCommentReaction} from '../controllers/commentController.js';

const router = express.Router();

router.get('/', getAllComments);

router.post('/comment/{postId}', authenticate, postComment);

router.post('/comment/{commentId}', authenticate, editComment);
router.post('/comment/{commentId}', authenticate, deleteComment);

router.post('/reactions/{commentId}', authenticate, postCommentReaction)

export default router