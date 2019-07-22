import dotenv from 'dotenv';
import '@babel/polyfill';
import cors from "cors";
import express from 'express';
import path from "path";

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
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..",'/client/public')));





app.get('/api/search', Search.search);
app.put('/api/createUser', User.create);
app.get('/api/user/getData', User.getData);
app.patch('/api/updateUser', User.update);
app.get("/api/getUser", User.getUser);


app.put('/api/admin/addBook', Books.insert);
app.delete('/api/admin/removeBook', Books.remove);
app.patch('/api/admin/updateBook', Books.update);
app.post('/api/getBook', Books.getBook);
app.get('/api/searchBookId', Books.searchBookId);
app.get('/api/searchAllBookId', Books.searchAllBookId);

app.put('/api/admin/addAuthor', Authors.insert);
app.delete('/api/admin/removeAuthor', Authors.remove);
app.patch('/api/admin/updateAuthor', Authors.update);
app.post('/api/getAuthor', Authors.getAuthor);
app.get('/api/getAllAuthors', Authors.getAllAuthors);
app.post('/api/getAuthorAndBooks', Authors.getAuthorAndBooks);


app.put('api/admin/addBorrow', Borrows.add);
app.patch('api/admin/returnBook', Borrows.bookReturn);
app.delete('api/admin/removeBorrow', Borrows.remove);

app.put('/api/admin/addGenre', Genres.add);
app.delete('/api/admin/removeGenre', Genres.remove);
app.patch('/api/admin/updateGenre', Genres.update);
app.get('/api/getAllGenres', Genres.getAll);

app.put('/api/admin/addPublisher', Publishers.add);
app.delete('/api/admin/removePublisher', Publishers.remove)
app.patch('/api/admin/updatePublisher', Publishers.update)
app.get('/api/getAllPubs', Publishers.getAll);

app.put('/api/admin/addTranslator', Translators.add);
app.delete('/api/admin/removeTranslator', Translators.remove);
app.patch('/api/admin/updateTranslator', Translators.update);
app.get('/api/getAllTranslators', Translators.getAll);

app.patch('/api/user/prolong', Borrows.prolong);
app.post('/api/user/addReservation', Reservations.add);
app.delete('/api/user/removeReservation', Reservations.remove);

app.get('/api/searchUsers', User.searchUsers)

app.get('/api/admin/filters', Filters.getAll);

app.post('/api/login', User.login);
app.post('/api/decodeToken', Auth.decodeToken);

// app.get('/api/admin/', Auth.verifyAdminToken, (req, res) => {
//     res.status(200).send({ 'message': "admin works" })
// });

// check for outdated reservations every 6 hours
cron.schedule('0 */6 * * *', () => {
    Reservations.removeOutdated();
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });

  

app.listen(PORT);



console.log('server is running on port', PORT);