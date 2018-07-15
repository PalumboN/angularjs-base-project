global.Promise = require('bluebird')
global.requireDir = require('require-dir')
global.include = (path) => require(`${__dirname}/${path}`)
global._ = require('lodash')

require('mongoose').Promise = Promise
Promise.promisifyAll(require('request'))
