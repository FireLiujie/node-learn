let mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'learn',
  socketPath: '/tmp/mysql.sock'
})

connection.connect()

let updateSql = 'update user set name = ?,age = ?where id = ?'
let updateSqlParams = ['chenchenc', '25', 1]

connection.query(updateSql, updateSqlParams, (err, res) => {
  if (err) {
    console.log('修改错误')
    console.log(err)
  } else {
    console.log('修改成功')
    console.log(res)
  }
})

connection.end()
