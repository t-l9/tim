var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({

    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    img: String,
    topic: { type: String, required: true }

});

new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true, select: false }
});

module.exports = mongoose.model('Post', PostSchema);
