var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'shilan',
    password: '1234',
    database: 'sixbao'
  })

module.exports = connection;