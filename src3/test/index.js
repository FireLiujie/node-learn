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

http
  .createServer((req, res) => {
    // 设置cors 跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 设置header类型
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    // 跨域允许的请求方式
    res.setHeader('Content-Type', 'application/json')
    if (req.method == 'POST') {
      // 接口 POST 形式
      console.log('\n[post 形式]')
      // 获取前端发来的路由地址
      let pathName = req.url
      console.log('\n接口为：' + pathName)
      // 接收发送过来的参数
      let tempResult = ''

      // 数据接入中
      req.addListener('data', chunk => {
        tempResult += chunk
      })

      // 数据接收完成
      req.addListener('end', () => {
        let result = JSON.stringify(qs.parse(tempResult))
        console.log('\n参数为：')
        console.log(result)
        if (pathName == '/sendMessage') {
          // 提交留言信息
          console.log('\n[API-提交留言信息]')
        } else if (pathName == '/login') {
          // 登录
          console.log('\n[API-登录]')
        } else if (pathName == '/register') {
          // 注册
          console.log('\n[API-注册]')
        }
      })
    } else if (req.method == 'GET') {
      // 接口GET形式
      console.log('\n[GET 形式]')
      // 解析url接口
      let pathName = url.parse(req.url).pathname
      console.log('\n接口为：' + pathName)
      if (pathName == '/getMessage') {
        // 获取留言信息
        console.log('\n[API- 获取留言信息]')
      } else if (pathName == '/') {
        // 首页
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=UTF-8'
        })

        res.write('<h1>前端服务已开启！！</h1>')

        res.end()
      }
    }
  })
  .listen(8888)

// 获取当前时间
function getNowFormatDate() {
  var date = new Date()
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1 // 月
  var strDate = date.getDate() // 日
  var hour = date.getHours() // 时
  var minute = date.getMinutes() // 分
  var second = date.getMinutes() // 秒
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  // 返回 yyyy-mm-dd hh:mm:ss 形式
  var currentdate =
    year +
    '-' +
    month +
    '-' +
    strDate +
    ' ' +
    hour +
    ':' +
    minute +
    ':' +
    second
  return currentdate
}
