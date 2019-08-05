'use strict';

module.exports.equal = function (a, b, options) {
    if(!a || !b){
        return options.inverse(this);
    }
    if (a.toString() === b.toString()) {
        return options.fn(this);
    }
    return options.inverse(this);
};

module.exports.notEqual = function (a, b, options) {
    if (a !== b) {
        return options.fn(this);
    }
    return options.inverse(this);
};