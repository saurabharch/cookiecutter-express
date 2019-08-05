'use strict';

const mongoose = require('mongoose');
const credential = require('./credential');


const opts =  {
    useNewUrlParser: true, useCreateIndex: true,
    keepAlive: 1
};

module.exports = function (app) {
    switch (app.get('env')) {
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
            throw new Error('Unknown execution environment: ' + app.get('env'));
    }
    return mongoose;
};