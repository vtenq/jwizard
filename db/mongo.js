const MongoClient = require('mongodb').MongoClient

// Connection URI
const MONGODB_URI = process.env.MONGODB_URI;

// cached DB client
let client;

async function initDB() {
  if (!MONGODB_URI) {
    throw 'No MONGODB_URI provided, add it to .env'
  }

  // Use connect method to connect to the server
  client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true })
  console.log('Connected to Mongo DB')
}

function getDB() {
  return client.db
}

module.exports = {
  initDB,
  getDB
}
