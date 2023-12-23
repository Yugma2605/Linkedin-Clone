const Comment = require('../models/Comment');

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
        const UserId = req.body.UserID;
        const CommentatorID = req.body.CommentatorID;
        const Content = req.body.Content;
        UserID = UserId;
        // Check if the post exists
        const post = await Post.findOne({ PostID });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        // Check if the user exists
        const user = await User.findById(UserID);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Create a new comment
        const newComment = new Comment({
          PostID,
          UserID,
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
        const commentID = req.params.CommentID;
    
        // Check if the comment exists
        const comment = await Comment.findOne({ CommentID });
        if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
        }
    
        // Delete the comment
        await Comment.deleteOne({ CommentID });
    
        // Update the comments count in the post
        await Post.updateOne({ PostID: comment.PostID }, { $inc: { CommentsCount: -1 } });
    
        res.json({ message: 'Comment deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { GetComments, PostComments, DeleteComments };
