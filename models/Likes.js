const mongoose = require('mongoose');
const { Schema } = mongoose;

const likesSchema = new mongoose.Schema({
    LikeID: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },
    PostID: {
      type: Schema.Types.ObjectId, // Assuming PostID is a string, change it accordingly if it's a different type
      ref: 'Post',
      validate: {
        validator: value => mongoose.Types.ObjectId.isValid(value) || typeof value === 'string',
        message: 'PostID must be a valid ObjectId or a string.',
      },
    },
    LikeSenderID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator: value => mongoose.Types.ObjectId.isValid(value) || typeof value === 'string',
        message: 'UserID must be a valid ObjectId or a string.',
      },
    }
  }); 
  
  
  
  
  module.exports  = mongoose.model('Like', likesSchema);
  
  
