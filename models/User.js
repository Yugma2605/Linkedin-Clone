const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
        unique: true,
    },
    firstName: {
        type: String,
        default: " ",
    },
    lastName: {
        type: String,
        default: " ",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    education: [
        {
            school: {
                type: String,
                default: "",
            },
            degree: {
                type: String,
                default: "",
            },
            fieldOfStudy: {
                type: String,
                default: "",
            },
            startDate: {
                type: Date,
                default: null,
            },
            endDate: {
                type: Date,
                default: null,
            },
        },
    ],
    experience: [
        {
            company: {
                type: String,
                default: "",
            },
            position: {
                type: String,
                default: "",
            },
            startDate: {
                type: Date,
                default: null,
            },
            endDate: {
                type: Date,
                default: null,
            },
        },
    ],
    location: {
        type: String,
        default: "",
    },
    connectionStatus: {
        type: String,
        enum: ['Connected', 'Pending', 'Not Connected'],
        default: 'Not Connected',
    },
});

module.exports = mongoose.model('User', userSchema);
