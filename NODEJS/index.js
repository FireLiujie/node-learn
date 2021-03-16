
console.log(process.argv)

let playerAction = process.argv[process.argv.length - 1]

let random = Math.random() * 3

let computerAction

if (random < 1) { 
    computerAction = 'rock'
} else if (random > 2) {
    computerAction = 'scissor'
} else {
    computerAction = 'paper'
}

console.log(playerAction,computerAction)

if (playerAction == computerAction) {
    console.log('平局')
} else if ((computerAction == 'rock' && playerAction == 'scissor') || (computerAction == 'scissor' && playerAction == 'paper') || (computerAction == 'paper' && playerAction == 'rock')) {
    console.log('你输了')
} else {
    console.log('你赢了')
}
     