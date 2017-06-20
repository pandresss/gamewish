const pgp = require('pg-promise')();

const db = pgp(
    process.env.DATABASE_URL

    ||
    'postgres://paulsanabria@localhost:5432/gamesdb');



module.exports = db;
