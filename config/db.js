const mongoose = require('mongoose')

const dbURLs = {
    development: { connectionString: process.env.DB_URI_DEV},
    production: { connectionString: process.env.DB_URI_PRO}
}

module.exports =()=>{
    try{
        mongoose.connect("mongodb://0.0.0.0:27017/smartEarner");
        console.log("Database connected")
    }
    catch(err){
        console.log("Database connection error");
    }
}