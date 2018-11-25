const mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: '192.168.0.111',
        user: 'root',
        password: '',
        database: 'payfast'
    });
}

module.exports = () => {
    return createDBConnection;
}