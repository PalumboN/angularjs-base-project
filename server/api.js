mongoose = require('mongoose')
passport = require('passport')
router = require('express').Router()
gmail = require('./gmail')
schemas = require('./schemas')
const {crud, send, authMiddleware} = require('./utils')
const {mongo, sellerId} = require('../config')

mongoose.plugin(require('crud-mongoose-simple'))

mongoose
.connect(mongo, { useMongoClient: true })
.then((db) => {
	const { Entity } = schemas(db)

	crud(router, '/entities', Entity, "name")

	router.get('/blah', authMiddleware, (req, res) => {
		Promise.resolve("Private endpoint")
		.asCallback(send(res))
	})

	router.get('/bleh', ({ body }, res) => {
		Promise.resolve("Public endpoint")
		.asCallback(send(res))
	})
})

module.exports = router
