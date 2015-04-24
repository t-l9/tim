var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true, select: false }
});

//---------------------------------------
//  hash password before saving user
//---------------------------------------
UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next();

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
