import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';
import cors from "cors";

import cookieParser from "cookie-parser";

import cron from 'node-cron';

import User from "./src/controllers/User";

import Auth from './src/middleware/Auth';

import Search from "./src/controllers/Search";
import Books from "./src/controllers/Books";
import Authors from "./src/controllers/Authors";
import Borrows from "./src/controllers/Borrows";
import Genres from "./src/controllers/Genres";
import Publishers from "./src/controllers/Publishers";
import Translators from "./src/controllers/Translators";
import Reservations from "./src/controllers/Reservations";
import Filters from "./src/controllers/Filters";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());



app.get('/search', Search.search);
app.put('/user/create', User.create);
app.post('/user/getData', User.getData);


app.put('/admin/addBook', Books.insert);
app.delete('/admin/removeBook', Books.remove);
app.patch('/admin/updateBook', Books.update);
app.post('/getBook', Books.getBook);

app.put('/admin/addAuthor', Authors.insert);
app.delete('/admin/removeAuthor', Authors.remove);
app.patch('/admin/updateAuthor', Authors.update);

app.put('/admin/addBorrow', Borrows.add);
app.patch('/admin/returnBook', Borrows.bookReturn);
app.delete('/admin/removeBorrow', Borrows.remove);

app.put('/admin/addGenre', Genres.add)
app.delete('/admin/removeGenre', Genres.remove)
app.patch('/admin/updateGenre', Genres.update)

app.put('/admin/addPublisher', Publishers.add);
app.delete('/admin/removePublisher', Publishers.remove)
app.patch('/admin/updatePublisher', Publishers.update)
app.get('/getAllPubs', Publishers.getAll);

app.put('/admin/addTranslator', Translators.add);
app.delete('/admin/removeTranslator', Translators.remove);
app.patch('/admin/updateTranslator', Translators.update);


app.post('/user/prolong', Borrows.prolong);
app.post('/user/addReservation', Reservations.add);
app.delete('/user/removeReservation', Reservations.remove);

app.get('/admin/filters', Filters.getAll);

app.post('/login', User.login);

app.get('/admin/', Auth.verifyAdminToken, (req, res) => {
    res.status(200).send({ 'message': "admin works" })
});

// check for outdated reservations every 6 hours
cron.schedule('0 */6 * * *', () => {
    Reservations.removeOutdated();
})

app.listen(3000);



console.log('server is running on port', PORT);