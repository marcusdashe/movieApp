const mongoose = require("mongoose")
const crypto = require("crypto")
const uniqueValidator = require("mongoose-unique-validator")
const mongoConfig = require("../config/credentials")

// mongoose.set("useCreateIndex", true)
mongoose.Promise = global.Promise

const { Schema } = mongoose
const objectID = Schema.Types.ObjectId

const UserSchema = new Schema({
    _id: objectID,
    firstName: { type: String, default: null, required: [true, "Can't be blank"]},
    lastName: { type: String, default: null, required: [true, "Can't be blank"]},
    email: { type: String, default: null, unique: true, required: [true, "Can't be blank"]},
    phone: { type: String, default: null, unique: true},
    userId: { type: objectID, unique: true},
    passwordHash: {type: String, default: null },
    salt: {type: String, default: null },
    isAdmin: { type: Boolean, default: false }
}, { timestamp: true }) // createdAt and updatedAt field will be created on User model

UserSchema.plugin(uniqueValidator, {message: "Is already taken"})

// Hashing User password
UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString("hex")
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex")
}

// Validate User Password
UserSchema.methods.validPassword =  (password) => {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, "sha512").toString("hex")
    return this.hash === hash
}

module.exports.User = mongoConfig.model("User", UserSchema)