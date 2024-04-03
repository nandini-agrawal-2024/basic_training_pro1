const mysql = require('mysql2')

const con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "nan@123",
        database: "allTask",
        dateStrings: true
    })

con.connect(function (err) {
    if (err) throw err;
    console.log("DB Connection Successful")
});

module.exports = con;