'use strict';
// This file define the controllers and views
// return moment().add(days, 'd').toDate();

module.exports = {
    Index: function (req, res, next) { /* jshint unused: false */
        res.render('index', {
            title: 'CareTracking '
        });
    },
    getLogin: function (req, res) {
        res.render('login' );
    },
    postLogin: function (req, res) {
        res.redirect('/');
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    }

};