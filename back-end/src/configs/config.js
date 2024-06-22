import "dotenv/config";

const development = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        dialect: process.env.DEV_DB_DIALECT,
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        username: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        timezone: process.env.DEV_DB_TIMEZONE,
    },
};

const production = {
    app: {
        port: process.env.PRO_APP_PORT,
    },
    db: {
        dialect: process.env.PRO_DB_DIALECT,
        host: process.env.PRO_DB_HOST,
        port: process.env.PRO_DB_PORT,
        username: process.env.PRO_DB_USER,
        password: process.env.PRO_DB_PASSWORD,
        database: process.env.PRO_DB_NAME,
        timezone: process.env.PRO_DB_TIMEZONE,
    },
};

const config = {
    development,
    production,
};
const env = process.env.NODE_ENV || "dev";
export default config[env];
