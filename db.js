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
    create: {users: `CREATE TABLE IF NOT EXISTS
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
    )`,},

    drop: {
        users: 'DROP TABLE IF EXISTS users RETURNNING *',
        admins: 'DROP TABLE IF EXISTS admins RETURNING *'
    }

}

const createUsersTable = table('users', Queries.create.users);

const createAdminsTable = table('admins', Queries.create.admins);

const dropUsersTable = table('users', Queries.drop.users);

const dropAdminsTable = table('admins', Queries.drop.admins);



const createAllTables = () => {
    createUsersTable();
    createAdminsTable();
};

const dropAllTables = () => {
    dropUsersTable();
    dropAdminsTable();
}

pool.on('remove', () => {
    console.log('disconnected from the clio_db');
    process.exit(0);
})


module.exports = {
    createUsersTable,
    createAdminsTable,
    dropUsersTable,
    dropAdminsTable,
    createAllTables,
    dropAllTables
};

require('make-runnable');