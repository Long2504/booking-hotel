import config from "../configs/config.js";

const HEADER = {
    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "authorization",
};

const EXPIRES_TOKEN = {
    ACCESS_TOKEN: config.app.accessTokenExpires,
    REFRESH_TOKEN: config.app.refreshTokenExpires,
};

export { HEADER, EXPIRES_TOKEN };
