const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "paasman",
    host: "localhost",
    port: 5432,
    database: "simpleblog"
});

module.exports = pool;