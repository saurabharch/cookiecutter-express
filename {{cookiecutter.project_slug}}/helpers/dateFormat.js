'use strict';

module.exports  =function(datetime) {
    if(typeof datetime==='string'){
        datetime = new Date(datetime);
    }
    if(datetime) {
        return datetime.toLocaleDateString('en-GB');
    }else{
        return datetime;
    }
};