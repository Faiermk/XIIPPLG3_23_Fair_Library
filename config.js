require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.SECRET_KEY,
};
