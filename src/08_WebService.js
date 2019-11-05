// 引入http模块
let http = require('http')

// 引入fs模块
let fs = require('fs')

// 引入 url 模块
let url = require('url')

// 引入 Path 模块
let path = require('path')

http
  .createServer((req, res) => {
    // 获取响应路径
    let pathName = url.parse(req.url).pathname
    // 默认加载路径
    if (pathName == '/') {
      // 默认加载的首页
      pathName = 'index.html'
    }

    let extName = path.extname(pathName)

    // 过滤 /favicon.ico 的请求
    if (pathName != '/favicon.ico') {
      // 获取 08_WebService 下的 index.html
      fs.readFile('src/08_WebService/' + pathName, (err, data) => {
        if (err) {
          // 如果不存在这个文件
          console.log('404 Not Found!')
          fs.readFile(
            'src/08_WebService/404.html',
            (errorNotFound, dataNotFound) => {
              if (errorNotFound) {
                console.log(errorNotFound)
              } else {
                res.writeHead(200, {
                  'Content-Type': 'text/html;charset=utf-8'
                })
                // 读取写入文件
                res.write(dataNotFound)
                // 结束响应
                res.end()
              }
            }
          )
          return
        } else {
          // 获取文件类型
          let ext = getExt(extName)

          // 设置请求头
          res.writeHead(200, {
            'Content-Type': ext + ';charset=utf-8'
          })
          // 读取写入文件
          res.write(data)
          // 结束响应
          res.end()
        }
      })
    }
  })
  .listen(8080)

// 获取后缀名
getExt = extName => {
  //   switch (extName) {
  //     case '.html':
  //       return 'text/html'
  //     case '.css':
  //       return 'text/css'
  //     case '.js':
  //       return 'text/js'
  //     default:
  //       return 'text/html'
  //   }

  // readFile 是异步操作，所以需要使用 readFileSync
  let data = fs.readFileSync('src/08_ext.json')
  console.log(data)
  let ext = JSON.parse(data.toString())
  return ext[extName]
}
