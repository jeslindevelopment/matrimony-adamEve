const mongoose = require('mongoose');
const Subscribe = require('./seeders/subscribe.seeder');
// const { database, databaseDefault } = require('./config')
// const mongoURL = database;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  Subscribe
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () => {
  let { connectAllDatabase } = require('./models')
  connectAllDatabase()
}
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = {
  seedersList,
  connect,
  dropdb
}
