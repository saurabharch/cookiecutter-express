'use strict';

const mongoose = require('mongoose');
const EUM = require('express-user-model');
const passportLocalMongoose = require('passport-local-mongoose');

module.exports.loginMethod = {
    facebook: 1,
    local: 0,
    google: 2
};

const gender = ['m', 'f', ''];

const userSchema = mongoose.Schema({
    authId: String,
    loginMethod: {type: Number, min: 0, default: 0},
    created: Date,
    gender: {type: String, enum: gender},
    last_login: Date
});

userSchema.plugin(EUM);
userSchema.plugin(passportLocalMongoose);
userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc, callback) {
    const self = this;
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(doc, (err, result) => {
            return callback(err, result);
        });
    });
};



const User = mongoose.model('User', userSchema);
module.exports = User;
