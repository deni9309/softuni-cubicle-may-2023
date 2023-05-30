const mongoose = require("mongoose");

const connString = 'mongodb://127.0.0.1:27017/cubicle-may-2023'

async function dbConnect() {
    await mongoose.connect(connString);
}

module.exports = dbConnect;