const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true
    },
    RedirectURL: String,
    visitedHistory:[{
        timestamp: Number
    }]
}, {timestamps:true})

const URL = mongoose.model("url",urlSchema);

module.exports = URL;