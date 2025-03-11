const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'BoOlEaN139',
    database: 'movies_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection OK');
});

module.exports = connection;