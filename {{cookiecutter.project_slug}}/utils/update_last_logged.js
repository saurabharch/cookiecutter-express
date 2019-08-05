'use strict';

module.exports = function (req, res, next) {
    const user = req.user;
    if (user) {
        user.last_login = new Date();
        user.save().then(function (changed) {
            req.user = changed;
            next();
        }).catch(function (error) {
            next(error);
        });
    } else {
        next();
    }
};