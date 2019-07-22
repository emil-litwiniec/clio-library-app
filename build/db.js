"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', function () {
  console.log('connected to the clio_db');
});

var table = function table(_table, query) {
  pool.query(query).then(function (data) {
    console.log(data);
    console.log("done");
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    console.log("unable to create ".concat(_table, " table"));
  });
};

var Queries = {
  create: {
    users: "CREATE TABLE IF NOT EXISTS\n        users(\n            id UUID PRIMARY KEY,\n            first_name VARCHAR(30) NOT NULL,\n            last_name VARCHAR(30) NOT NULL,\n            email VARCHAR(128) UNIQUE NOT NULL,\n            password VARCHAR(128) NOT NULL,\n            phone_number VARCHAR(30) NOT NULL\n        )",
    admins: "CREATE TABLE IF NOT EXISTS\n        admins(\n            user_id UUID PRIMARY KEY,\n            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n        )",
    books: "CREATE TABLE IF NOT EXISTS\n        books(\n            book_id UUID PRIMARY KEY,\n            title VARCHAR(250) NOT NULL,\n            author_id INT REFERENCES authors (author_id) ON DELETE SET NULL,\n            series VARCHAR(250),\n            edition VARCHAR(200),\n            genre_id INT REFERENCES genres (genre_id) ON DELETE SET NULL,\n            keywords VARCHAR[],\n            ukd VARCHAR(50),\n            lang VARCHAR(50) NOT NULL,\n            pub_year INT,\n            translator_id INT REFERENCES translators (translator_id) ON DELETE SET NULL,\n            pub_id INT REFERENCES publishers (pub_id) ON DELETE SET NULL,\n            isbn VARCHAR NOT NULL,\n            create_date DATE,\n            last_update DATE\n        )",
    authors: "CREATE TABLE IF NOT EXISTS\n        authors(\n            author_id SERIAL PRIMARY KEY,\n            first_name VARCHAR(150) NOT NULL,\n            last_name VARCHAR(150) NOT NULL,\n            origin VARCHAR(50)\n        )",
    publishers: "CREATE TABLE IF NOT EXISTS\n        publishers(\n            pub_id SERIAL PRIMARY KEY,\n            name VARCHAR(150) UNIQUE NOT NULL,\n            est_year INT,\n            address VARCHAR(150),\n            origin VARCHAR(100)\n        )",
    translators: "CREATE TABLE IF NOT EXISTS\n        translators(\n            translator_id SERIAL PRIMARY KEY,\n            first_name VARCHAR(50),\n            last_name VARCHAR(150) NOT NULL\n        )",
    borrows: "CREATE TABLE IF NOT EXISTS\n        borrows(\n            borrow_id UUID PRIMARY KEY,\n            user_id UUID NOT NULL REFERENCES users (id),\n            book_id UUID NOT NULL REFERENCES books (book_id),\n            taken_date TIMESTAMP NOT NULL,\n            exp_brought_date TIMESTAMP NOT NULL,\n            prolongs INTEGER\n\n        )",
    borrowsHistory: "CREATE TABLE IF NOT EXISTS\n        borrows_history(\n            borrow_id UUID PRIMARY KEY,\n            user_id UUID NOT NULL REFERENCES users (id),\n            book_id UUID NOT NULL REFERENCES books (book_id),\n            taken_date TIMESTAMP NOT NULL,\n            exp_brought_date TIMESTAMP NOT NULL,\n            brought_date TIMESTAMP,\n            prolongs INTEGER\n\n        )",
    genres: "CREATE TABLE IF NOT EXISTS\n        genres(\n            genre_id SERIAL PRIMARY KEY,\n            genre_name VARCHAR(100) UNIQUE NOT NULL\n        )",
    reservations: "CREATE TABLE IF NOT EXISTS\n        reservations(\n            res_id UUID PRIMARY KEY,\n            user_id UUID NOT NULL REFERENCES users (id),\n            book_id UUID NOT NULL REFERENCES books (book_id),\n            res_date TIMESTAMP NOT NULL\n        )"
  },
  drop: {
    users: 'DROP TABLE IF EXISTS users CASCADE',
    admins: 'DROP TABLE IF EXISTS admins CASCADE',
    books: 'DROP TABLE IF EXISTS books CASCADE',
    authors: 'DROP TABLE IF EXISTS authors CASCADE',
    publishers: 'DROP TABLE IF EXISTS publishers CASCADE',
    translators: 'DROP TABLE IF EXISTS translators CASCADE',
    borrows: 'DROP TABLE IF EXISTS borrows CASCADE',
    borrowsHistory: 'DROP TABLE IF EXISTS borrows_history CASCADE',
    genres: 'DROP TABLE IF EXISTS genres CASCADE',
    reservations: 'DROP TABLE IF EXISTS reservations CASCADE'
  }
};

var createUsersTable = function createUsersTable() {
  return table('users', Queries.create.users);
};

var createAdminsTable = function createAdminsTable() {
  return table('admins', Queries.create.admins);
};

var createBooksTable = function createBooksTable() {
  return table('books', Queries.create.books);
};

var createAuthorsTable = function createAuthorsTable() {
  return table('authors', Queries.create.authors);
};

var createPublishersTable = function createPublishersTable() {
  return table('publishers', Queries.create.publishers);
};

var createTranslatorsTable = function createTranslatorsTable() {
  return table('translators', Queries.create.translators);
};

var createBorrowsTable = function createBorrowsTable() {
  return table('borrows', Queries.create.borrows);
};

var createBorrowsHistoryTable = function createBorrowsHistoryTable() {
  return table('borrowsHistory', Queries.create.borrowsHistory);
};

var createGenresTable = function createGenresTable() {
  return table('genres', Queries.create.genres);
};

var createReservationsTable = function createReservationsTable() {
  return table('reservations', Queries.create.reservations);
};

var dropUsersTable = function dropUsersTable() {
  return table('users', Queries.drop.users);
};

var dropAdminsTable = function dropAdminsTable() {
  return table('admins', Queries.drop.admins);
};

var dropBooksTable = function dropBooksTable() {
  return table('books', Queries.drop.books);
};

var dropAuthorsTable = function dropAuthorsTable() {
  return table('authors', Queries.drop.authors);
};

var dropPublishersTable = function dropPublishersTable() {
  return table('publishers', Queries.drop.publishers);
};

var dropTranslatorsTable = function dropTranslatorsTable() {
  return table('translators', Queries.drop.translators);
};

var dropBorrowsTable = function dropBorrowsTable() {
  return table('borrows', Queries.drop.borrows);
};

var dropBorrowsHistoryTable = function dropBorrowsHistoryTable() {
  return table('borrowsHistory', Queries.drop.borrowsHistory);
};

var dropGenresTable = function dropGenresTable() {
  return table('genres', Queries.drop.genres);
};

var dropReservationsTable = function dropReservationsTable() {
  return table('reservations', Queries.drop.reservations);
};

var createAllTables = function createAllTables() {
  createUsersTable();
  createAdminsTable();
  createGenresTable();
  createPublishersTable();
  createTranslatorsTable();
  createAuthorsTable();
  createBooksTable();
  createBorrowsTable();
  createBorrowsHistoryTable();
  createReservationsTable();
};

var dropAllTables = function dropAllTables() {
  dropUsersTable();
  dropAdminsTable();
  dropGenresTable();
  dropPublishersTable();
  dropTranslatorsTable();
  dropAuthorsTable();
  dropBooksTable();
  dropBorrowsTable();
  dropBorrowsHistoryTable();
  dropReservationsTable();
};

pool.on('remove', function () {
  console.log('disconnected from the clio_db');
  process.exit(0);
});
module.exports = {
  createUsersTable: createUsersTable,
  createBooksTable: createBooksTable,
  createAdminsTable: createAdminsTable,
  createAuthorsTable: createAuthorsTable,
  createPublishersTable: createPublishersTable,
  createTranslatorsTable: createTranslatorsTable,
  createBorrowsTable: createBorrowsTable,
  createGenresTable: createGenresTable,
  createReservationsTable: createReservationsTable,
  dropUsersTable: dropUsersTable,
  dropAdminsTable: dropAdminsTable,
  dropBooksTable: dropBooksTable,
  dropAuthorsTable: dropAuthorsTable,
  dropPublishersTable: dropPublishersTable,
  dropTranslatorsTable: dropTranslatorsTable,
  dropBorrowsTable: dropBorrowsTable,
  dropGenresTable: dropGenresTable,
  dropReservationsTable: dropReservationsTable,
  createAllTables: createAllTables,
  dropAllTables: dropAllTables
};

require('make-runnable');