'use strict';

module.exports = function () {
    return function (req, res, next) {
        if (req.user) {
                res.locals.user = req.user;
                next();
        } else {
            res.redirect('/login');
        }
    };
};