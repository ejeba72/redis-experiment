// 1702hr wed may31 2023

const { config } = require('dotenv');
const express = require('express');
const { userRoute } = require('./routes/user.route');
const { mongodb } = require('./db/connect.db');

// dotenv and mongodb connection
config();
mongodb();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/', userRoute);

app.listen(PORT, () => {
    console.log(`Server is attentively listening for requests @ 127.0.0.1:${PORT}`);
});