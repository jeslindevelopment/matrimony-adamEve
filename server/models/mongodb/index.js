const { ConnectionManager } = require('../')
const mongoose = require('mongoose')

const mongoConnection = (config) => {
	const options = {}
	let at = ''
	let by = ''
	let on = ''
	if (config.user && config.user != '') {
		at = '@'
	} else {
		config.user = ''
	}
	if (config.pass && config.pass != '') {
		by = ':'
	} else {
		config.pass = ''
	}
	if (config.port && config.port != '') {
		on = ':'
	} else {
		config.port = ''
	}
	// mongoose.set('useUnifiedTopology', true);
	// var conn = mongoose.createConnection(config.url, { useNewUrlParser: true, poolSize: 50 })
	var conn = mongoose.createConnection(config.url)

	// mongoose.Promise = global.Promise
	conn.on('error', () => {
		console.error.bind(console, 'app:database MongoDB connection error : \n')
	})
	conn.on('open', () => {
		console.log('app:database MongoDB connection success !')
	})

	return conn
}

const manager = new ConnectionManager(mongoConnection, 'mongodb')

module.exports = manager
