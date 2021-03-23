const fs = require('fs')
const express = require('express')
const game = require('./game')

let playerWinCount = 0
let playerWon = 0
let playerLastAction = null
let sameCount = 0

let app = express()

app.get('/favicon.ico', function (request, response) {
    response.send(200)
    // response.writeHead(200)
    // response.end()
    return
})

app.get('/game', function (request, response, next) {

    if (playerWinCount >= 3 || sameCount == 9) {
        response.status(500)
        response.send('我再也不和你玩了')
        return
    }
    next()

    if (response.playerWon) {
        playerWinCount++
    }
}, function (request, response,next) {
     const query = request.query
    const playerAction = query.action
    
    if (!playerAction) {
        response.status(400)
        response.send()
        return
    }

        if (playerLastAction && playerLastAction == playerAction) {
            sameCount++
             if (sameCount >= 3) {
                response.writeHead(400)
                response.end('你作弊！')
                sameCount = 9
                return
            }
        } else {
            sameCount = 0
        }
    playerLastAction = playerAction
        response.playerAction = playerAction
        next()
},
    function (request, response) {
        const playerAction = response.playerAction
        const gameResult = game(playerAction)

        // 先返回头部
        response.writeHead(200)

        if (gameResult == 0) {
            response.end('平局！')
        } else if (gameResult == 1) {
            response.end('你赢了！')
            response.playerWon = true
        } else {
            response.end('你输了！')
        }
})

app.get('/', function (request, response) {
    response.send(fs.readFileSync(__dirname + '/index.html','utf-8'))
})

app.listen(3000)
