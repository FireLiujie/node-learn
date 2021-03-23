module.exports = function (playerAction) {
    if (!['rock', 'scissor', 'paper'].includes(playerAction)) {
        throw new Error('invalid playerAction')
    }

    // 计算电脑出的东西
    let number = Math.random() * 3
    let computerAction
    if (number < 1) {
        computerAction = 'rock'
    } else if (number > 2) {
        computerAction = 'scissor'
    } else {
        computerAction = 'paper'
    }

    if (playerAction == computerAction) {
        return 0
    } else if ((playerAction == 'rock' && computerAction == 'scissor') || (playerAction == 'scissor' && computerAction == 'paper') || (playerAction == 'paper' && computerAction == 'rock')) {
        return 1
    } else {
        return -1
    }
}