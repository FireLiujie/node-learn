// 1.引入 http 模块
var http = require('http')

// 2.用 http 模块创建服务
/**
 * req 获取 url 信息(request)
 * res 浏览器返回响应信息(response)
 */
http
  .createServer((req, res) => {
    // 设置 http 头部，状态码是200，文件类型是Html，字符集是utf8
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=UTF-8'
    })

    // 往页面打印值
    res.write('<h1 style="text-align:center">Hello NodeJS</h1>')

    // 结束响应
    res.end()
  })
  .listen(3000) // 监听的端口
