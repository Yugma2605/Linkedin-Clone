const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    PostID : { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId(), unique: true },
    UserID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
          validator: value => {
              return mongoose.Types.ObjectId.isValid(value) || typeof value === 'string';
          },
          message: 'UserID must be a valid ObjectId or a string.'
    }},
    Content :  { type: String, default: " "},
    Timestamp: {
        type: Date,
        default: Date.now
    },
    LikesCount :{
    type: Number,
    default: 0
    },
    CommentsCount :{
    type: Number,
    default: 0
    }
  });
  

module.exports = mongoose.model('Post', postSchema);
