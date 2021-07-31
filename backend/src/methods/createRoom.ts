import { Socket } from "socket.io"
import { allPlayersOnline, allRooms, Sockets } from '../index'

function createRoom(socket: Socket) {
    const roomName = socket.id.substr(3, 3)

    allPlayersOnline.forEach((player) => {
        if (player.id === socket.id) {
            socket.join(roomName)
            player.room = roomName
            socket.emit('Me', player)
            const room = {
                roomName: roomName,
                player1: player,
                player2: undefined
            }
            allRooms.push(room)
            socket.emit('Room', room)
            Sockets.emit('AllPlayersOnline', allPlayersOnline)
        }
    })
}

export { createRoom }