const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageID: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        unique: true,
    },
    senderID: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    receiverID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
