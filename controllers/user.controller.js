// 1717hr wed may31 2023

const { UserModel } = require("../models/user.model");

async function postUser(res, req) {
    try {
        const { name, age } = res.body;
        console.log(name, age);
        const newUser = new UserModel({ name, age });
        await newUser.save();
        console.log({
            msg: 'New user saved',
            newUser
        });
        req.status(201).send({
            msg: 'New user saved',
            newUser
        });
    } catch (err) {
        console.error(err.message);
        req.status(500).send(err);
    }
}

async function getAllUsers(response, request_na) {
    try {
        const getUsersFromDb = await UserModel.find();
        console.log(getUsersFromDb);
        request_na.status(200).send(getUsersFromDb);
    } catch (err) {
        console.error(err.message);
        request_na.status(500).send(err.message);
    }
}

async function getOneUser(req, res) {
    try {
        const { age } = req.params;
        console.log('{ req.params: ', age, ' }');
        const user = await UserModel.findOne({ age });
        console.log({ user });
        res.status(200).send({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

module.exports = { postUser, getAllUsers, getOneUser };



// async function getOneUser(odion, kenny) {
//     try {
//         const { age } = odion.params;
//         console.log({ age });
//         const user = await UserModel.findOne({ age });
//         console.log(user);
//         kenny.status(200).send(user);
//     } catch (err) {
//         console.error(err.message);
//         kenny.status(500).send(err.message);
//     }
// }