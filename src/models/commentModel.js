import mongoose from 'mongoose';

const {Schema} = mongoose;

const reactionSchema = new Schema({
  type: {
    type: String,
    enum: ['like', 'love', 'laugh', 'wow', 'angry', 'sad'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { _id: false });

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  reactions: [reactionSchema]
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
