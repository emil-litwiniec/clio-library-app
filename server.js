import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';

import cookieParser from "cookie-parser";

import User from "./src/controllers/User";

import Auth from './src/middleware/Auth';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.post('/createUser', User.create);
app.post('/login', User.login);
app.get('/something', Auth.verifyToken, (req, res) => {
    res.status(200).send({"message": "authorization works"});
});

app.get('/admin', Auth.verifyAdminToken, (req, res) => {
    res.status(200).send({'message': "admin works"})
})

// app.get('/admin', Auth.verifyAdminToken, (req, res) => {
//     return res.status(200).send({"message": "You are on admin's route."})
// });

app.listen(3000);

console.log('server is running on port', PORT);