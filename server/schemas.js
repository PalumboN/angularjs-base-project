const { Schema } = require('mongoose')
Mixed = Schema.Types.Mixed


Entity = new Schema({
	name: Mixed
})


module.exports = (db) => {
	return {
		Entity: db.model('Entity', Entity)
	}
}
