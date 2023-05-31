// 1852hr wed may31 2023

const { config } = require("dotenv");
const { connect } = require("mongoose");

config();
const DB_URI = process.env.DB_URI;

async function mongodb() {
    try {
        connect(DB_URI);
        console.log(`MongoDB is connected`);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { mongodb };