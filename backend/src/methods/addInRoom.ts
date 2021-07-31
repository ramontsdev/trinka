import { Socket } from 'socket.io'
import { Room } from '../@types'
import { Sockets, allPlayersOnline, allRooms } from '../index'

function addInRoom(room: Room, socket: Socket) {
    const { roomName } = room

    allPlayersOnline.forEach((player) => {
        if (player.id === socket.id) {
            socket.join(roomName)
            player.room = roomName
            room.player2 = player
            socket.emit('Me', player)
            Sockets.to(roomName).emit('JoinedAPlayer', room)
            Sockets.emit('AllPlayersOnline', allPlayersOnline)
        }
    })
}

export { addInRoom }