let mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'learn',
  socketPath: '/tmp/mysql.sock'
})

connection.connect()

let http = require('http')

let url = require('url')

// 引入 qs 模块：qs是对路径进行 json 化或者 将 json 转换为 string 路径
let qs = require('querystring')

/**
 * req 获取 url 信息 (request)
 * res 浏览器返回响应信息 (response)
 */

http.createServer((req, res) => {}).listen(8888)
