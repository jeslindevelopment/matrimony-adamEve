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

	// mongoose.connect('mongodb://' + config.user + by + config.pass + at + config.host + on + config.port + '/' + config.name, extend(options, config.options))
	// mongoose.set('useCreateIndex', true)
	mongoose.set('useFindAndModify', false);
	mongoose.set('autoIndex', false);
	// mongoose.set('useUnifiedTopology', true);
	// var conn = mongoose.createConnection(config.url, { useNewUrlParser: true, poolSize: 50 })
	var conn = mongoose.createConnection(config.url, { useNewUrlParser: true, poolSize: 50, keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000 })

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
