var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({

    title: { type: String, required: false },
    content: { type: String, required: false },
    date: { type: Date, default: Date.now },
    img: String,
    topic: { type: String, required: false }

});

PostSchema.pre('save', function(next) {

    var currentDate = new Date();

    this.date = currentDate;

    if (!this.date)
        this.created_at = currentDate;

    next();
});

module.exports = mongoose.model('Post', PostSchema);
