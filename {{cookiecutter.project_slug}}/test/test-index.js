'use strict';

const request = require('supertest');

const app = require('../app');

describe('Check View', function () {
        it('Index page should return without error', function (done) {
            request(app)
                .get('/')
                .expect(302)
                .end(function (err) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
});
