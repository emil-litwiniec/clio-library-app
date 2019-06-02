const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the clio_db');
})


const table = (table, query) => {
    pool.query(query).then(data => {
        console.log(data);
        console.log(`${table} table created`);
        pool.end();
    }).catch(err => {
        console.log(err);
        console.log(`unable to create ${table} table`)
    })
}

const Queries = {
    create: {
        
        users: `CREATE TABLE IF NOT EXISTS
        users(
            id UUID PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            surname VARCHAR(30) NOT NULL,
            email VARCHAR(128) UNIQUE NOT NULL,
            password VARCHAR(128) NOT NULL,
            phone_number VARCHAR(30) NOT NULL
        )`,

        admins: `CREATE TABLE IF NOT EXISTS
        admins(
            user_id UUID PRIMARY KEY,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )`,

        books: `CREATE TABLE IF NOT EXISTS
        books(
            book_id UUID PRIMARY KEY,
            title VARCHAR(250) NOT NULL,
            author_id INT NOT NULL,
            series VARCHAR(250),
            edition VARCHAR(200),
            genre_id INT,
            keywords VARCHAR[],
            ukd INT UNIQUE,
            lang VARCHAR(50) NOT NULL,
            pub_year INT,
            translator_id INT,
            pub_id INT,
            isbn VARCHAR NOT NULL,
            create_date DATE,
            last_update DATE
        )`,

        authors: `CREATE TABLE IF NOT EXISTS
        authors(
            author_id SERIAL PRIMARY KEY,
            first_name VARCHAR(150) NOT NULL,
            last_name VARCHAR(150) NOT NULL,
            origin VARCHAR(50)
        )`,

        publishers: `CREATE TABLE IF NOT EXISTS
        publishers(
            pub_id SERIAL PRIMARY KEY,
            name VARCHAR(150) UNIQUE NOT NULL,
            est_year INT,
            address VARCHAR(150),
            origin VARCHAR(100)
        )`,

        translators: `CREATE TABLE IF NOT EXISTS
        translators(
            translator_id SERIAL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(150) NOT NULL
        )`,

        borrows: `CREATE TABLE IF NOT EXISTS
        borrows(
            borrow_id UUID PRIMARY KEY,
            user_id UUID NOT NULL,
            book_id UUID NOT NULL,
            taken_date DATE NOT NULL,
            brought_date DATE
        )`
    },

    drop: {
        users: 'DROP TABLE IF EXISTS users',
        admins: 'DROP TABLE IF EXISTS admins',
        books: 'DROP TABLE IF EXISTS books',
        authors: 'DROP TABLE IF EXISTS authors',
        publishers: 'DROP TABLE IF EXISTS publishers',
        translators: 'DROP TABLE IF EXISTS translators',
        borrows: 'DROP TABLE IF EXISTS borrows'
    }

}


const createUsersTable = () => table('users', Queries.create.users);

const createAdminsTable = () => table('admins', Queries.create.admins);
const createBooksTable = () => table('books', Queries.create.books);
const createAuthorsTable = () => table('authors', Queries.create.authors);
const createPublishersTable = () => table('publishers', Queries.create.publishers);
const createTranslatorsTable = () => table('translators', Queries.create.translators);
const createBorrowsTable = () => table('borrows', Queries.create.borrows);

const dropUsersTable = () => table('users', Queries.drop.users);

const dropAdminsTable = () => table('admins', Queries.drop.admins);

const dropBooksTable = () => table('books', Queries.drop.books);
const dropAuthorsTable = () => table('authors', Queries.drop.authors);
const dropPublishersTable = () => table('publishers', Queries.drop.publishers);
const dropTranslatorsTable = () => table('translators', Queries.drop.translators);
const dropBorrowsTable = () => table('borrows', Queries.drop.borrows);


const createAllTables = () => {
    createUsersTable();
    createAdminsTable();
    createBooksTable();
    createAuthorsTable();
    createPublishersTable();
    createTranslatorsTable();
    createBorrowsTable();
};

const dropAllTables = () => {
    dropUsersTable();
    dropAdminsTable();
    dropBooksTable();
    dropAuthorsTable();
    dropPublishersTable();
    dropTranslatorsTable();
    dropBorrowsTable();
}

pool.on('remove', () => {
    console.log('disconnected from the clio_db');
    process.exit(0);
})


module.exports = {
    createUsersTable,
    createAdminsTable,
    createBooksTable,
    createAuthorsTable,
    createPublishersTable,
    createTranslatorsTable,
    createBorrowsTable,
    dropUsersTable,
    dropAdminsTable,
    dropBooksTable,
    dropAuthorsTable,
    dropPublishersTable,
    dropTranslatorsTable,
    dropBorrowsTable,
    createAllTables,
    dropAllTables
};

require('make-runnable');