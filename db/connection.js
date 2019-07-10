var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'admin',
  database        : 'pinnacle'
});

pool.getConnection(function(err, connection) {
    if (err) throw err;
});

module.exports = pool