import Comment from '../models/commentModel.js';


export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.query; 

    const filter = postId ? { post: postId } : {};

    const comments = await Comment.find(filter)
      .populate('user', 'username email') 
      .populate('reactions.user', 'username') 
      .sort({ createdAt: -1 });

    res.json({
      count: comments.length,
      comments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error });
  }
};

export const postComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user.id;

    const comment = new Comment({
      text,
      post: postId,
      user: userId
    });

    const savedComment = await comment.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comment: savedComment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

export const postCommentReaction = async (req, res) => {
  try {
    const { commentId } = req.params; // comment ID
    const { type } = req.body;
    const userId = req.user.id;

    if (!['like', 'love', 'laugh', 'wow', 'angry', 'sad'].includes(type)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const existingIndex = comment.reactions.findIndex(
      r => r.user.toString() === userId
    );

    if (existingIndex !== -1) {
      // Update reaction
      comment.reactions[existingIndex].type = type;
    } else {
      // Add new reaction
      comment.reactions.push({ type, user: userId });
    }

    await comment.save();

    res.json({
      message: 'Reaction saved successfully',
      reactions: comment.reactions
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to react to comment', error });
  }
};


export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params; 
    const { text } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Only the comment author can edit
    if (comment.user.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to edit this comment' });
    }

    comment.text = text || comment.text;
    await comment.save();

    res.json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment', error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Only the comment author or admin can delete
    if (comment.user.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error });
  }
};