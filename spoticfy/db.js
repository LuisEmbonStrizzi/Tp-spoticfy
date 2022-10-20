const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'spoticfy'
});

conn.connect((err) => {
    if (err) console.log(err)

    else{
        console.log("La base de datos está conectada")
    }
})

module.exports = conn;
