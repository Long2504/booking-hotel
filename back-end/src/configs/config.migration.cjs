require("dotenv").config();

module.exports = {
    development: {
        dialect: process.env.DEV_DB_DIALECT,
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        username: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        logging: console.log,
    },
    production: {
        dialect: process.env.PRO_DB_DIALECT,
        host: process.env.PRO_DB_HOST,
        port: process.env.PRO_DB_PORT,
        username: process.env.PRO_DB_USER,
        password: process.env.PRO_DB_PASSWORD,
        database: process.env.PRO_DB_NAME,
    },
    test: {
        dialect: process.env.TEST_DB_DIALECT,
        host: process.env.TEST_DB_HOST,
        port: process.env.TEST_DB_PORT,
        username: process.env.TEST_DB_USER,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
    },
};
