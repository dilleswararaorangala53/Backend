const mysql = require("mysql2");

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"9010990109",
    database:"jntugv",
    port:"3306"
})

module.exports = con;
