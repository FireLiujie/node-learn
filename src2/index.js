let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  socketPath: '/tmp/mysql.sock',
  database: 'learn'
})

connection.connect()

connection.query('select * from user', (err, result, field) => {
  if (err) throw err
  console.log(result)
})

connection.end()
