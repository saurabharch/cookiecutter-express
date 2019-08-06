'use strict';

require('dotenv').config();
const credential = require('./config/credential');
const User = require('./models/users');

if (process.argv.length < 7) {
    console.log('The format for using it is as below.\n');
    console.log('npm run createuser -- <FirstName> <LastName> <username> <email@address.com> <password>');
    process.exit(1);
}

const mongoose = require('mongoose');

const opts = {
    useNewUrlParser: true, useCreateIndex: true,
    keepAlive: 1
};


switch (process.env.NODE_ENV) {
    case 'development':
        mongoose.connect(credential.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credential.mongo.production.connectionString, opts);
        break;
    case 'test':
        mongoose.connect(credential.mongo.test.connectionString, opts);
        break;
    default:
        mongoose.connect(credential.mongo.development.connectionString, opts);
        break;
}
User.register(new User({
    username: process.argv[4],
    first_name: process.argv[2],
    last_name: process.argv[3],
    email: process.argv[5],
    created: Date.now(),
}), process.argv[6], function (err, account) {
    if (err) {
        console.log('Ouch we reached an error');
        console.log(err.message);
        process.exit(0);

    } else {
        console.log('Account created');
        console.log(account._id);
        process.exit(0);

    }
});

