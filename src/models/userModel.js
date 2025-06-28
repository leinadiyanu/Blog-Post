import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
    firstName: { type: String, required: true },
    surname: { type: String},
  },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    resetToken: String,
    resetTokenExpires: Date,

    role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

export default mongoose.model('User', userSchema);
