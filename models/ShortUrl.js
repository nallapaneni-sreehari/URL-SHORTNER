const mongoose = require('mongoose');
const shortid = require('shortid');

const ShortUrl = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type:String,
        required:true,
        default:shortid.generate
    },
    clickCount:{
        type:Number,
        required:true,
        default:0
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    recentClick:{
        type: Date,
        default: Date.now
    },
    ipAddress:{
        type:String
    }
});

module.exports = mongoose.model("ShortUrl", ShortUrl);