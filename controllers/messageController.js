const Message = require('../models/Message');

async function getMessages(req, res) {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getMessagesById(req,res){
    try {
        const message = await Message.findById(req.params.messageID);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function postMessage(req,res){
    try {
        // console.log(req.body);
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function patchMessage(req,res){
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.messageID, req.body, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function deleteMessage(req,res){
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.messageID);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json(deletedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getMessages, getMessagesById, postMessage, deleteMessage, patchMessage};
