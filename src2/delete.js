// 连接 mysql
let mysql = require('mysql')
// mysql的连接信息
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'learn',
  socketPath: '/tmp/mysql.sock'
})

// 开始连接
connection.connect()

var delSql = 'delete from user where id = 2'

// 连接sql并实施语句
connection.query(delSql, (err, res) => {
  if (err) {
    console.log('删除错误')
    console.log(err)
  } else {
    console.log('删除成功')
    console.log(res)
  }
})

// 终止连接
connection.end()
