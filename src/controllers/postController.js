import Post from '../models/postModel.js'

//USER
export const getAPost = async(req, res) => {
    try {
    
    const {PostId} = req.params
    const post = await Post.findById(PostId).populate("author");
    
    res.status(200).json({ post });

} catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
} 
};

export const getAllPosts = async(req, res) => {
   try {
    const post = await Post.find().populate("author")
    
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
}

//ADMIN
// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
      authorId: req.user.id  
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
};


// Update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.content = content || post.content;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post', error });
  }
};


// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error });
  }
};
