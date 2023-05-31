// 1717hr wed may31 2023

const { UserModel } = require("../models/user.model");

async function postUser(req, res) {
    try {
        const { name, age } = req.body;
        const payload = { name, age };
        const newUser = new UserModel(payload);
        // // console.log(name, age);
        // // const newUser = new UserModel({ name, age });
        await newUser.save();
        // console.log({
        //     msg: 'New user saved',
        //     newUser
        // });
        // res.status(201).send({
        //     msg: 'New user saved',
        //     newUser
        // });
        console.log(newUser);
        res.send(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
}

module.exports = { postUser };