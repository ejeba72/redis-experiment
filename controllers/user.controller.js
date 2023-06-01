// 1717hr wed may31 2023

const { Redis } = require("ioredis");
const { UserModel } = require("../models/user.model");

const redis = new Redis();

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
        request_na.status(200).json(getUsersFromDb);
    } catch (err) {
        console.error(err.message);
        request_na.status(500).json(err.message);
    }
}

async function getOneUser(req, res) {
    try {
        //Redis steps:
        // 1. Attempt to get data from redis.
        // 2. If there is a hit, all is well and good!
        // 3. send the data to http client.
        // 4. Otherwise, get data from the persistent database.
        // 5. Write that data to redis.
        // 6. send data to http client
        
        const { age } = req.params;
        
        let cacheEntry = await redis.get(age);

        if (cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry);
            console.log({ ...cacheEntry, 'source': 'cache' });
            res.status(200).json({ ...cacheEntry, 'source': 'cache' });
            return
        }

        const dbEntry = await UserModel.findOne({ age });

        redis.set(age, JSON.stringify(dbEntry), 'EX', 15);

        console.log({ ...dbEntry, 'source': 'database' });
        res.status(200).send({ ...dbEntry, 'source': 'database' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

module.exports = { postUser, getAllUsers, getOneUser };


// // 1ST ITERATION:
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


// // 2ND ITERATION:
// async function getOneUser(req, res) {
//     try {
//         //Redis steps:
//         // 1. Attempt to get data from redis.
//         // 2. If there is a hit, all is well and good!
//         // 3. send the data to http client.
//         // 4. Otherwise, get data from the persistent database.
//         // 5. Write that data to redis.
//         // 6. send data to http client

        
//         const { age } = req.params;
        
        
//         const cacheKey = `userAge:${age}`;

//         let cacheValue = await redis.get(cacheKey);

//         if (cacheValue) {
//             // cacheValue = JSON.stringify(cacheValue);
//             stringifiedCacheValue = JSON.parse(cacheValue);
//             console.log({ ...cacheValue, 'source': 'cache' });
//             // return res.status(200).send({ ...cacheValue, 'source': 'cache' });
//             // res.status(200).json({ ...cacheValue, 'source': 'cache' });
//             console.log(stringifiedCacheValue);
//             res.status(200).json({ ...stringifiedCacheValue, "source" : "cache" });
//             return
//         }

//         // console.log('{ req.params: ', age, ' }');
//         const user = await UserModel.findOne({ age });
//         const dbValue = user;


//         redis.set(cacheKey, JSON.stringify(dbValue), 'EX', 15);


//         console.log({ ...dbValue, 'source': 'database' });
//         res.status(200).send({ ...dbValue, 'source': 'database' });


//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send(err.message);
//     }
// }



// // 3RD ITERATION:
// async function getOneUser(req, res) {
//     try {
//         //Redis steps:
//         // 1. Attempt to get data from redis.
//         // 2. If there is a hit, all is well and good!
//         // 3. send the data to http client.
//         // 4. Otherwise, get data from the persistent database.
//         // 5. Write that data to redis.
//         // 6. send data to http client
        
//         const { age } = req.params;
//         console.log('{ req.params: ' + age + ' }');
//         console.log('{ req.params:', age, '}');
//         console.log(`{ req.params: ${age} }`);
//         console.log({ age });
        
//         let cacheEntry = await redis.get(age);

//         if (cacheEntry) {
//             cacheEntry = JSON.parse(cacheEntry);
//             console.log({ ...cacheEntry, 'source': 'cache' });
//             res.status(200).json({ ...cacheEntry, 'source': 'cache' });
//             return
//         }

//         const dbEntry = await UserModel.findOne({ age });

//         redis.set(age, JSON.stringify(dbEntry), 'EX', 15);

//         console.log({ ...dbEntry, 'source': 'database' });
//         res.status(200).send({ ...dbEntry, 'source': 'database' });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send(err.message);
//     }
// }