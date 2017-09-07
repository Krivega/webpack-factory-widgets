const argv = require('yargs').argv;

module.exports = argv.environment || argv.env || 'dev';
