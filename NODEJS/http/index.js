const queryString = require('querystring')
const http = require('http')
const url = require('url')
const fs = require('fs')

const game = require('./game')

let playerWon = 0
let playerLastAction = null
let sameCount = 0

http.createServer(function (request, response) {

    // 通过内置模块url，转换发送到该http服务上的http请求包的url
    // 将其分割成 协议(protocol)://域名(host):端口(port)/路径名(pathname)?请求参数(query)
    const parsedUrl = url.parse(request.url)
    console.log(parsedUrl)

    if (parsedUrl.pathname == '/favicon.ico') {
        response.writeHead(200)
        response.end()
        return
    }

    if (parsedUrl.pathname == '/game') {
        const query = queryString.parse(parsedUrl.query)
        const playerAction = query.action

        if (playerWon >= 3 || sameCount == 9) {
            response.writeHead(500)
            response.end('我再也不和你玩了')
            return
        }

        if (playerLastAction && playerLastAction == playerAction) {
            sameCount ++
        } else {
            sameCount = 0
        }

        playerLastAction = playerAction
        
        if (sameCount >= 3) {
            response.writeHead(400)
            response.end('你作弊！')
            sameCount = 9
            return
        }
        
        const gameResult = game(playerAction)

        // 先返回头部
        response.writeHead(200)

        if (gameResult == 0) {
            response.end('平局！')
        } else if (gameResult == 1) {
            response.end('你赢了！')
            playerWon++
        } else {
            response.end('你输了！')
        }
    }

    // 如果访问的是根路径，则把游戏页面读出来返回出去
    if (request.url == '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(response)
    }
}).listen(3000)