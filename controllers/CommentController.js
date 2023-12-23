const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

  // GET comments for a specific post

async function GetComments(req, res){
    try {
      const PostID = req.params.PostID;
  
      // Check if the post exists
      const post = await Post.findOne({ PostID });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      // Retrieve comments for the specified post
      const comments = await Comment.find({ PostID })
  
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function PostComments(req, res){
    try {
        const PostID = req.body.PostID;
        const userID = req.body.UserID;
        const CommentatorID = req.body.CommentatorID;
        const Content = req.body.Content;
        // Check if the post exists
        console.log(req.body.UserID);
        const post = await Post.findOne({ PostID:PostID });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        // Check if the user exists
        const user = await User.findOne({userID:userID});
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const Commentator = await User.findOne({userID:CommentatorID});
        if (!Commentator) {
          return res.status(404).json({ error: 'Commentator not found' });
        }
    
        // Create a new comment
        const newComment = new Comment({
          PostID,
          userID,
          Content,
          CommentatorID
        });
    
        // Save the comment
        const savedComment = await newComment.save();
    
        // Update the comments count in the post
        await Post.updateOne({ PostID }, { $inc: { CommentsCount: 1 } });
    
        res.json(savedComment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
  
async function DeleteComments(req, res){
    try {
        const commentID = req.params.commentID;
        console.log(commentID);
        // Check if the comment exists
        const comment = await Comment.findOne({ CommentID:commentID });
        if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
    
        // Delete the comment
        await Comment.deleteOne({ CommentID:commentID });
    
        // Update the comments count in the post
        await Post.updateOne({ PostID: comment.PostID }, { $inc: { CommentsCount: -1 } });
    
        res.json({ message: 'Comment deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { GetComments, PostComments, DeleteComments };
