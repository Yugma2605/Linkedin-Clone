const mongoose = require('mongoose');
const { Schema } = mongoose;


const connectionSchema = new mongoose.Schema({
    ConnectionID: { type: Schema.Types.ObjectId, default:() => new mongoose.Types.ObjectId(), unique: true },
    UserID1: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
          validator: value => {
              return mongoose.Types.ObjectId.isValid(value) || typeof value === 'string';
          },
          message: 'UserID must be a valid ObjectId or a string.'
    }
    },
    UserID2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: value => {
                return mongoose.Types.ObjectId.isValid(value) || typeof value === 'string';
            },
            message: 'UserID must be a valid ObjectId or a string.'
    }
    },
    ConnectionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Connection', connectionSchema);