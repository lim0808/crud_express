const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'express',
//   timezone: '+08:00'
// });

const pool = mysql.createPool({
  host: 'mysql2.sqlpub.com:3307',
  user: 'root_12',
  password: '1dvXki1ihwjeCWWh',
  database: 'mydb_lim_1',
  timezone: '+08:00'
});

module.exports = pool.promise(); // 使用 Promise 语法
