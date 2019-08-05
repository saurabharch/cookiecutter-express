'use strict';

module.exports = function (name) {
    return process.env.STATIC_URL + name;
};
