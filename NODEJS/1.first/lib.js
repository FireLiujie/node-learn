
module.exports = function (playerAction) {
    let random = Math.random() * 3
    let computerAction
    if (random < 1) { 
        computerAction = 'rock'
    } else if (random > 2) {
        computerAction = 'scissor'
    } else {
        computerAction = 'paper'
    }

    console.log('电脑出了',computerAction)
    console.log('我出了',playerAction)

    if (playerAction == computerAction) {
        console.log('平局')
        return 0
    } else if ((computerAction == 'rock' && playerAction == 'scissor') || (computerAction == 'scissor' && playerAction == 'paper') || (computerAction == 'paper' && playerAction == 'rock')) {
        console.log('你输了')
        return 1
    } else {
        console.log('你赢了')
        return -1
    }
}

     