const Post = require('../models/Post');
const Like = require('../models/Likes');
const User = require('../models/User');

async function getLikes(req, res){
    try {
      const PostID = req.params.PostID;
  
      // Check if the post exists
      const post = await Post.findOne({ PostID:PostID });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      // Retrieve comments for the specified post
      const Likes = await Like.find({ PostID:PostID })
  
      res.json(Likes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function PostLike(req, res){
    try {
        const PostID = req.body.PostID;
        const LikeSenderID = req.body.userID;

        // Check if the post exists
        console.log(req.body.userID);
        const post = await Post.findOne({ PostID:PostID });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        // Check if the user exists
        const user = await User.findOne({userID:LikeSenderID});
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

    
        // Create a new comment
        const newLike = new Like({
          PostID,
          LikeSenderID
        });
    
        // Save the comment
        const savedLike = await newLike.save();
    
        // Update the comments count in the post
        await Post.updateOne({ PostID }, { $inc: { LikesCount: 1 } });
    
        res.json(savedLike);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


async function DeleteLike(req, res){
    try {
        const LikeID = req.params.LikeID;
        console.log(LikeID);
        // Check if the comment exists
        const like = await Like.findOne({ LikeID:LikeID });
        if (!like) {
          return res.status(404).json({ error: 'Like not found' });
        }
    
        // Delete the comment
        await Like.deleteOne({ LikeID:LikeID });
    
        // Update the comments count in the post
        await Post.updateOne({ PostID: Like.PostID }, { $inc: { LikesCount: -1 } });
    
        res.json({ message: 'Comment deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { getLikes, PostLike, DeleteLike };
