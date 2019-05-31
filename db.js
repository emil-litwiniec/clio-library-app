const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the clio_db');
})

const createUsersTable = () => {
    const query =
    `CREATE TABLE IF NOT EXISTS
        users(
            id UUID PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            surname VARCHAR(30) NOT NULL,
            email VARCHAR(128) UNIQUE NOT NULL,
            password VARCHAR(128) NOT NULL,
            phone_number VARCHAR(30) NOT NULL
        )`;

    pool.query(query).then((data) => {
        console.log(data);
        console.log('users table created');
        pool.end();
    }).catch(err => {
        console.log(err);
        console.log('unable to create users table');
        pool.end();
    })
};

const createAdminsTable = () => {
    const query = 
    `CREATE TABLE IF NOT EXISTS
        admins(
            user_id UUID PRIMARY KEY,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )`;

    pool.query(query).then(data => {
        console.log(data);
        console.log('admins table created');
        pool.end();
    }).catch(err => {
        console.log(err);
        console.log('unable to create admins table');
        pool.end();
    })

};

const dropUsersTable = () => {
    const query = 'DROP TABLE IF EXISTS users RETURNNING *';

    pool.query(query).then(data => {
        console.log(data);
        console.log('users table has been dropped');
        pool.end();
    }).catch(err => {
        console.log(err);
        console.log('unable to drop users table');
        pool.end();
    }) ;
};

const dropAdminsTable = () => {
    const query = 'DROP TABLE IF EXISTS admins RETURNING *';

    pool.query(query).then(data => {
        console.log(data);
        console.log('admins table has been dropped');
        pool.end();
    }).catch(err => {
        console.log(err);
        console.log('unable to drop admins table');
        pool.end();
    })
};

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