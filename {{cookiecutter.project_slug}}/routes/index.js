'use strict';
// This is for url and routes definitions only

const express = require('express');
const router = express.Router();

//register middleware here
const login_required = require('../middlewares/login-required')();

// Controller
const controller = require('../controllers/index');

// Utils 
const update_last_logged = require('../utils/update_last_logged');
module.exports = function(passport){
    /* GET home page. */
    router.get('/', login_required, controller.Index);


    router.get('/login', controller.getLogin);

    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), update_last_logged, controller.postLogin);


    router.get('/logout', login_required, controller.logout);

    router.get('/auth/facebook', passport.authenticate('facebook'));
    router.get('/auth/google', passport.authenticate('google', {
        scope: ['profile']
    }));

    router.get('/facebook/callback', passport.authenticate('facebook', {
            failureRedirect: '/login'
        }), update_last_logged,
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    router.get('/google/callback', passport.authenticate('google', {
            failureRedirect: '/login'
        }), update_last_logged,
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    return  router;
}