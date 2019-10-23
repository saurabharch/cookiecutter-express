'use strict';

require('dotenv').config();
const credential = require('./config/credential');


// Import 3rd party tools here
const createError = require('http-errors'); // To produce http errors like 404 error
const express = require('express'); 
const path = require('path');
const csurf = require('csurf'); // For csrf protection
const helmet = require('helmet'); // Helmet helps you secure your Express apps by setting various HTTP headers. 
const logger = require('morgan'); // For logging files
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');
const flash = require('connect-flash'); // For flash messages
const sentry = require('@sentry/node');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const rfs = require('rotating-file-stream');
const fs = require('fs');
const morgan = require('morgan');


// Import helpers here
const section = require('./helpers/section');
const staticFiles = require('./helpers/static');
const mathHelper = require('./helpers/math');
const equalHelper = require('./helpers/equals');
const dateHelper = require('./helpers/dateFormat');

// Authentication Setups
const User = require('./models/users'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// For username login
passport.use(new LocalStrategy(User.authenticate()));
// For google login
passport.use(new GoogleStrategy({
        clientID: credential.google.clientId,
        clientSecret: credential.google.clientSecret,
        callbackURL: process.env.BASE_URL + '/google/callback',
        passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, cb) {
        let user = req.user;
        if (!user) {
            // If user is not logged in, return the user who is associated with provided google account
            User.findOne({authId: profile.id, loginMethod: 2}, function (err, user) {
                return cb(err, user);
            });
        } else {
            // If the user is logged in, associate the user with the provided google account
            user.authId = profile.id;
            user.loginMethod = 2;
            if (!(user.first_name)) {
                user.first_name = profile.name.givenName;
            }
            if (!(user.last_name)) {
                user.last_name = profile.name.familyName;
            }
            user.save();
            return cb(null, user);
        }
    }
));

// For facebook login
passport.use(new FacebookStrategy({
        clientID: credential.facebook.clientId,
        clientSecret: credential.facebook.clientSecret,
        callbackURL: process.env.BASE_URL + '/facebook/callback',
        profileFields: ['id', 'email', 'first_name', 'gender', 'last_name', 'link'],
        passReqToCallback: true

    },
    function (req, accessToken, refreshToken, profile, cb) {
        let user = req.user;
        if (!user) {
            // If user is not logged in, return the user who is associated with provided facebook account
            User.findOne({authId: profile.id, loginMethod: 1}, function (err, user) {
                return cb(err, user);
            });
        } else {
            // If the user is logged in, associate the user with the provided facebook account
            user.authId = profile.id;
            user.loginMethod = 1;
            if (!(user.first_name)) {
                user.first_name = profile.name.givenName;
            }
            if (!(user.last_name)) {
                user.last_name = profile.name.familyName;
            }
            user.save();
            return cb(null, user);
        }
    }
));
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err || !user) {
            return done(err, null);
        }
        done(null, user);
    });
});



// Import routers here
const indexRouter = require('./routes/index')(passport);
const usersRouter = require('./routes/users');


const app = express();
app.enable('trust proxy');


sentry.init({dsn: process.env.SENTRY_DSN});
app.use(helmet());

// view engine setup
app.engine('.hbs', exphbs({
    extname: '.hbs', defaultLayout: 'base',
    helpers: {
        section: section,
        static: staticFiles,
        math: mathHelper,
        ifeq: equalHelper.equal,
        ifnoteq: equalHelper.notEqual,
        date: dateHelper
    }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
require('./config/db')(app);




app.use(logger('dev'));
switch (app.get('env')) {
    case 'development':
        app.use(logger('dev'));
        break;
    case 'production':
        const logDirectory = path.join(__dirname,'log');
        if(!fs.existsSync(logDirectory)){
            fs.mkdirSync(logDirectory);
        }
        const accessLogStream = rfs('access.log', {
            interval: '1d', // rotate daily
              path: logDirectory
        });
        app.use(morgan('combined', { stream: accessLogStream }));
        break;
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({extended: true}));
//form-urlencoded

app.use(session({
    secret: credential.secret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(csurf());


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.csrf_token = req.csrfToken();
    res.locals.info_message = req.flash('info');
    res.locals.error_message = req.flash('error');
    next();
});
// Add routes here
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// The error handler must be before any other error middleware
app.use(sentry.Handlers.errorHandler());

// Optional fallthrough error handler
/* jshint unused: false */

app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    // set locals, only providing error in development
    res.locals.message = req.app.get('env') === 'development' ? err.message : '';
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.statusCode = err.status || 500;
    res.render('error');
});


module.exports = app;
