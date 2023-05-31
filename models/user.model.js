// 1656hr wed may31 2023

const { model, Schema } = require("mongoose");

const userSchema = Schema({
    name: String,
    age: Number,
});

const UserModel = model('User', userSchema);

module.exports = { UserModel };