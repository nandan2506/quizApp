const mongoose = require('mongoose')
require('dotenv').config()



const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected to db')
    } catch (error) {
        console.log("error while connecting to db", error)
    }
}

module.exports = connectDb