import { Room } from "../../@types"
import { Sockets } from '../..'

export let timerCountdown: NodeJS.Timeout

function startCountdown(room: Room) {
    if (room.gameMatch.startGame) {
        timerCountdown = setInterval(() => {
            room.gameMatch.timer -= 1
            Sockets.in(room.roomName).emit('Room', room)
            verifyCountdown(room)
        }, 1000)
    }
}

function verifyCountdown(room: Room) {
    if (room.gameMatch.timer === 0) {
        room.gameMatch.turn = !room.gameMatch.turn
        room.gameMatch.timer = 3
        Sockets.in(room.roomName).emit('Room', room)
    }
}

export { startCountdown }