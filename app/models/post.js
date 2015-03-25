var mongoose = require('mongoose');
var Schema   = mongoose.Schema();

var PostSchema = new Schema({

    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    img: { type: String },
    topic: { type: String, required: true }


});
