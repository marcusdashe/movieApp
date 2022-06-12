const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            trim: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        referralCode: {
            type: String,
            require: true,
        },
        time: {
            type: Number,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", schema);