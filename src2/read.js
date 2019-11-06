let mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'learn',
  socketPath: '/tmp/mysql.sock'
})

connection.connect()

let readSql = 'select * from user'

connection.query(readSql, (err, res) => {
  if (err) {
    console.log('查询失败')
    console.log(err)
  } else {
    console.log('查询成功')
    console.log(res)
  }
})

connection.end()
