const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Modelo de los usuarios.

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 14
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    bio: {
        type: String,
        maxlength: 240
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tweet'
    }],
    _id: {
        type: String
    }
})

//Hashing password

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) 
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;