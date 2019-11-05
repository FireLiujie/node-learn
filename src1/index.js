// 加载 http 模块
let http = require('http')

// 虚拟 SQL 读取出来的数据
let items = []

// 创建 http 服务
http
  .createServer((req, res) => {
    //设置跨域的域名，*代表允许任意域名跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 设置header 类型
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    // 设置允许请求
    res.setHeader('Access-Control-Allow-Methods', '*')
    // 跨域允许的请求方式
    res.setHeader('Content-Type', 'application/json')
    console.log(req.method)

    // 判断请求
    switch (req.method) {
      // post请求时，浏览器会先发一次 options请求，如果请求通过，则继续发送正式的post请求
      case 'OPTIONS':
        res.statusCode = 200
        res.end()
        break

      //如果是get请求，则直接返回items数据
      case 'GET':
        let data = JSON.stringify(items)
        res.write(data)
        res.end()
        break

      // 如果是Post 请求
      case 'POST':
        let item = ''
        // 读取每次发送的数据
        req.on('data', chunk => {
          item += chunk
        })
        // 数据发送完成
        req.on('end', () => {
          // 存入
          item = JSON.parse(item)
          if (item.item) {
            items.push(item.item)
          } else {
            items.splice(item.index, 1)
          }
          // 将数据返回到客户端
          let data = JSON.stringify(items)
          res.write(data)
          res.end()
        })
        break
    }
  })
  .listen(3000)
console.log('http server is start localhost:3000')
