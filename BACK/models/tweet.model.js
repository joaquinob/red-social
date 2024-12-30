const { default: mongoose } = require("mongoose");
const User = require("./user.model");

const tweetSchema = new mongoose.Schema({
    user: {
        type: User,
        required: true
    },
    text: {
        type: String,
        maxlength: 480
    },
    img:{
        type: Image
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet '
    }]
})