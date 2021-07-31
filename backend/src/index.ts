import { createServer } from 'http'
import { Server } from 'socket.io'

import { Board, GameMatch, PlayerOnline, Room } from './@types'
import { addInRoom, createRoom, rulesTree, startCountdown, timerCountdown } from './methods'
import { boardButtons } from './utils/mock/Buttons'

const server = createServer()
const Sockets = new Server(server)

const allPlayersOnline: Array<PlayerOnline> = []
const allRooms: Array<Room> = []

Sockets.on('connection', (socket) => {

  console.log(`O socket ${socket.id} está conectado`)

  const playerOnline: PlayerOnline = {
    id: socket.id,
    room: undefined
  }
  allPlayersOnline.push(playerOnline)
  Sockets.emit('AllPlayersOnline', allPlayersOnline)

  socket.on('CreateRoom', () => {
    createRoom(socket)
  })

  socket.on('JoinRoom', (roomName) => {
    allRooms.forEach(room => {
      if (roomName === room.roomName) {
        if (!room.player2)
          addInRoom(room, socket)
      }
    })
  })

  type Data = {
    playerName: string
    player: PlayerOnline
  }

  socket.on('ImReady', ({ playerName, player }: Data) => {
    allRooms.forEach((room) => {
      if (room.roomName === player.room) {
        if (room.player1.id === player.id) {
          const playerInGame: PlayerOnline = {
            id: player.id,
            room: player.room,
            myTurn: true,
            name: playerName,
            ready: true,
            score: 0
          }

          room.player1 = playerInGame
          socket.emit('Me', playerInGame)
          preReadyGame(room)
        } else if (room.player2.id === player.id) {
          const playerInGame: PlayerOnline = {
            id: player.id,
            room: player.room,
            myTurn: false,
            name: playerName,
            ready: true,
            score: 0
          }

          room.player2 = playerInGame
          socket.emit('Me', playerInGame)
          preReadyGame(room)
        }
      }
    })

    function preReadyGame(room: Room) {
      if (room.player1.ready && room.player2.ready) {
        const gameMatch: GameMatch = {
          player1: room.player1,
          player2: room.player2,
          board: {
            roomName: room.roomName,
            boardGame: boardButtons
          },
          startGame: false,
          timer: 3,
          turn: true
        }

        room.gameMatch = gameMatch
        Sockets.in(room.roomName).emit('Room', room)
      }
    }
  })

  //InGame

  //*==Recebe o tabuleiro e distribui para os outros sockets na sala==*//
  socket.on('StartGame', (player: PlayerOnline) => {
    allRooms.forEach(room => {
      if (room.roomName === player.room) {
        room.gameMatch.startGame = true
        startCountdown(room)
      }
    })
  })

  socket.on('SendedBoard', (board: Board, index: number) => {
    allRooms.forEach(room => {
      if (room.roomName === board.roomName) {

        const { player1, player2, gameMatch } = room

        if (player1.id === socket.id && gameMatch.turn) {
          rulesTree(room, board.boardGame, player1.id, index)
        } else if (player2.id === socket.id && !gameMatch.turn) {
          rulesTree(room, board.boardGame, player2.id, index)
        }
      }
    })
  })

  socket.on('PauseGame', (player: PlayerOnline) => {
    clearInterval(timerCountdown)

    allRooms.forEach(room => {
      if (room.roomName === player.room) {
        room.gameMatch.timer = 3
        room.gameMatch.board.boardGame = boardButtons
        room.gameMatch.startGame = false

        Sockets.in(room.roomName).emit('Room', room)
        Sockets.in(room.roomName).emit('FinishRound', false)
      }
    })
  })
  //===========================================================================

  socket.on('GameOver', (player: PlayerOnline) => {
    const { room } = player
    clearInterval(timerCountdown)

    allRooms.forEach((roomEl, index) => {
      if (roomEl.roomName === room) {

        socket.leave(roomEl.roomName)
        socket.disconnect()
        allRooms.splice(index, 1)

        const playerReset: PlayerOnline = {
          id: player.id,
          myTurn: undefined,
          room: undefined,
          name: undefined,
          ready: false,
          score: 0
        }

        allPlayersOnline.forEach(playerEl => {
          if (playerEl.id === player.id) {
            player = playerReset
            Sockets.emit('AllPlayersOnline', allPlayersOnline)
            socket.emit('Me', player)
          }
        })
      }
    })
  })

  socket.on('LeaveRoom', (roomName) => {
    allPlayersOnline.forEach((player) => {
      if (player.id === socket.id) {
        player.room = undefined
        socket.leave(roomName)
        Sockets.emit('AllPlayersOnline', allPlayersOnline)
        socket.emit('Me', player)
      }
    })
  })

  socket.on('disconnect', () => {
    allPlayersOnline.forEach((player, index) => {
      if (player.id === socket.id) {
        allPlayersOnline.splice(index, 1)
        Sockets.emit('AllPlayersOnline', allPlayersOnline)
      }
    })
  })
})

const PORT = process.env.PORT || 7000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export { Sockets, allRooms, allPlayersOnline }