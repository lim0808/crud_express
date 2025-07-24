const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'express',
//   timezone: '+08:00'
// });

const pool = mysql.createPool({
  host: 'mysql2.sqlpub.com',
  port: 3307,
  user: 'root_12',
  password: '1dvXki1ihwjeCWWh',
  database: 'mydb_lim_1',
  timezone: '+08:00',
  connectionLimit: 10,
  waitForConnections: true,
  // 🔑 加上这一句
  allowPublicKeyRetrieval: true,
  // 👇 如果没有使用 SSL，可以设为 false 避免额外认证步骤
  ssl: false
})

module.exports = pool.promise(); // 使用 Promise 语法
