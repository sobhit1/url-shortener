const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true
    },
    RedirectURL: String,
    visitedHistory:[{
        timestamp: Number
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
}, {timestamps:true})

const URL = mongoose.model("url",urlSchema);

module.exports = URL;