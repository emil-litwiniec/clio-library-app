import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';

import cookieParser from "cookie-parser";

import User from "./src/controllers/User";

import Auth from './src/middleware/Auth';

import Search from "./src/controllers/Search";
import Books from "./src/controllers/Books";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());



app.get('/search', Search.search);
app.post('/user/create', User.create);

app.put('/admin/insert', Books.insert);

app.post('/user/prolong');
app.post('/user/reservation');
app.post('/login', User.login);
app.get('/something', Auth.verifyToken, (req, res) => {
    res.status(200).send({ "message": "authorization works" });
});

app.get('/admin/', Auth.verifyAdminToken, (req, res) => {
    res.status(200).send({ 'message': "admin works" })
})

// app.get('/admin', Auth.verifyAdminToken, (req, res) => {
//     return res.status(200).send({"message": "You are on admin's route."})
// });

app.listen(3000);

console.log('server is running on port', PORT);