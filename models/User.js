const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: String,
    firstName: String,
    lastName: String,
    Email: String,
    Password: String,
    ProfilePicture: String,
    Bio: String,
    Company: String,
    Position: String,
    Location: String,
    Education: String,
    ConnectionStatus: String
});

module.exports = mongoose.model('User', userSchema);
