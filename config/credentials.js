const mongoose = require('mongoose')

const dbURLs = {
    development: { connectionString: process.env.DB_URI_DEV},
    production: { connectionString: process.env.DB_URI_PRO}
}


module.exports = mongoose.createConnection("mongodb://0.0.0.0:27017", { useNewUrlParser: true, useUnifiedTopology: true})
// module.exports = mongoose.createConnection(dbURLs.development.connectionString, { useNewUrlParser: true, useUnifiedTopology: true})