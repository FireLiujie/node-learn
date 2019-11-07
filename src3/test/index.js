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

          result = JSON.parse(result)

          let id = result.userid
          let username = result.username
          let messageText = result.message
          let time = getNowFormatDate()

          if (!messageText) {
            res.end('留言失败，留言内容为空！')
            return
          } else if (messageText.length > 140) {
            res.end('留言失败，字数超过限制！')
            return
          } else {
            let addSql =
              'INSERT INTO message(message,user_id,user_name,time) VALUES (?,?,?,?)'
            let addSqlParams = [messageText, id, username, time]

            connection.query(addSql, addSqlParams, (err1, res1) => {
              if (err1) {
                throw err1
              } else {
                console.log('\n新增成功')
                res.write(
                  JSON.stringify({
                    code: '0',
                    message: '新增成功！'
                  })
                )
                res.end()
              }
            })
          }
        } else if (pathName == '/login') {
          // 登录
          console.log('\n[API-登录]')
          result = JSON.parse(result)

          let username = result.username
          let password = result.password

          if (!username) {
            res.end('登录失败，用户名为空！')
            return
          } else if (!password) {
            res.end('登录失败，密码为空！')
            return
          } else if (username.length > 10) {
            res.end('登录失败，姓名过长！')
            return
          } else {
            let readSql = 'SELECT * FROM user WHERE name="' + username + '"'

            connection.query(readSql, (err1, res1) => {
              if (err1) {
                throw err1
              } else {
                if (res1 == undefined || res1.length == 0) {
                  res1.end('\n不存在该用户！')
                  return
                } else {
                  console.log('\n 存在用户')
                  let newRes = JSON.parse(JSON.stringify(res1))
                  console.log(newRes)
                  if (newRes[0].password == password) {
                    // 密码正确
                    res.write(
                      JSON.stringify({
                        code: '0',
                        message: '登录成功！',
                        data: {
                          id: newRes[0].id,
                          usernaName: newRes[0].name
                        }
                      })
                    )
                    res.end()
                  } else {
                    // 密码错误
                    res.write(
                      JSON.stringify({
                        code: '1',
                        message: '登录失败，密码错误！'
                      })
                    )
                    res.end()
                  }
                }
              }
            })
          }
        } else if (pathName == '/register') {
          // 注册
          console.log('\n[API-注册]')
          result = JSON.parse(result)
          let username = result.username // 用户名
          let password = result.password // 密码
          let time = getNowFormatDate() // 时间

          if (!username) {
            res.end('注册失败，用户名为空。')
            return
          } else if (!password) {
            res.end('注册失败，密码为空！')
            return
          } else if (username.length > 10) {
            res.end('注册失败，姓名过长！')
            return
          } else if (password.length > 20) {
            res.end('注册失败，密码过长！')
          } else {
            // 查询 user 表
            // 使用 promise 的原因是因为中间调用了两次数据库，而数据库查询是异步的，所以需要用promise

            new Promise((resolve, reject) => {
              // 新增的SQL 语句 及新增的字段信息
              let readSql = 'SELECT * FROM user'

              // 连接SQL 并实施语句
              connection.query(readSql, (err1, res1) => {
                if (err1) {
                  throw err1
                } else {
                  console.log('\n SQL查询结果：')
                  // 将结果先去掉 RowDataPacket,再转换为json对象
                  let newRes = JSON.parse(JSON.stringify(res1))
                  console.log(newRes)

                  // 判断姓名重复与否
                  let userNameRepeat = false
                  for (let item in newRes) {
                    if (newRes[item].name == username) {
                      userNameRepeat = true
                    }
                  }

                  if (userNameRepeat) {
                    res.end('注册失败，姓名重复！')
                    return
                  } else if (newRes.length > 300) {
                    res.end('注册失败，名额已满！')
                    return
                  } else {
                    resolve()
                  }
                }
              })
            }).then(() => {
              console.log('\n 第二步：')

              // 新增的 SQL语句及新增的字段信息
              let addSql =
                'INSERT INTO user(name,password,datetime) VALUES (?,?,?)'
              let addSqlParams = [username, password, time]

              // 连接 sql 并实施语句
              connection.query(addSql, addSqlParams, (err2, res2) => {
                if (err2) {
                  console.log('新增错误')
                  console.log(err2)
                } else {
                  console.log('\n sql查询结果：')
                  console.log(res2)
                  console.log('\n 注册成功！')

                  // 返回数据
                  res.write(
                    JSON.stringify({
                      code: '0',
                      message: '注册成功！'
                    })
                  )
                  res.end()
                }
              })
            })
          }
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

        // 解析 url 参数部分
        let params = url.parse(req.url, true).query
        console.log('\n 参数为：')
        console.log(params)

        let readSql = 'SELECT * FROM message'
        connection.query(readSql, (err1, res1) => {
          if (err1) {
            throw err1
          } else {
            let newRes = JSON.parse(JSON.stringify(res1))
            console.log(newRes)

            res.write(
              JSON.stringify({
                code: '0',
                message: '查询成功！',
                data: newRes
              })
            )
            res.end()
          }
        })
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
