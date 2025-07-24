const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express',
  timezone: '+08:00'
});

module.exports = pool.promise(); // 使用 Promise 语法
