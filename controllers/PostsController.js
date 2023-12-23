const Post = require('../models/Post');


async function getPost(req,res){
    const desiredPostID = req.params.id;
    if(desiredPostID==undefined){
      try {
          const posts = await Post.find();
          res.json(posts);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
    }
    else{
      try {
        console.log(desiredPostID);
        const post = await Post.findOne({ PostID: desiredPostID });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }
}


async function PostPost(req,res){
    const {  content, userID,  } = req.body;
  
    if (!content || !userID) {
        return res.status(400).json({ message: 'userID and content are required.' });
    }

    const newPost = new Post({ content, userID });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function DeletePost(req,res){
    try{
        const desiredPostID = req.params.id;
        if(desiredPostID==undefined){
          res.status(404).json({ message: 'Need post id to delete ' });
        }
        
        const result = await Post.deleteOne({ PostID: desiredPostID })
        if (result.deletedCount === 1) {
          res.status(204).send(); // 204 No Content for successful deletion
      } else {
          res.status(404).json({ message: 'Post not found or already deleted' });
      }
    }
     catch(error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getPost, PostPost, DeletePost };
