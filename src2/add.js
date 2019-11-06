let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'learn',
  socketPath: '/tmp/mysql.sock'
})

connection.connect()

let addSql = 'insert into user(id,name,age) values(0,?,?)'
let addSqlParams = ['liujie', '22']

connection.query(addSql, addSqlParams, (err, res) => {
  if (err) {
    console.log('新增错误！')
    console.log(err)
  } else {
    console.log('新增成功！')
    console.log(res)
  }
})

connection.end()
