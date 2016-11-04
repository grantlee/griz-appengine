/**
 * Basic logger built with Winston
 */
var config = require('./config');
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({filename: config.logFile})
    ]
});

module.exports = {
    info: function(str) {
        logger.info(str);
    },
    error: function(str) {
        logger.error(str);
    }
};