import { BoardButton, Room } from "../../@types"
import { winnerChecker } from "../../utils/winnerChecker"
import { hasTree } from "./hasTree"

import { Sockets } from '../..'

function rulesTree(
    room: Room, boardGameReceived: Array<BoardButton>,
    playerId: string, index: number
) {
    const { gameMatch: { board: { boardGame } } } = room

    if (boardGame[index].id === playerId && boardGame[index].backgroundImage) {

        boardGame[index].backgroundImage = ''
        boardGame[index].id = ''
        room.gameMatch.board.boardGame = boardGame
        Sockets.in(room.roomName).emit('Room', room)
    } else if (
        !boardGame[index].id
        && !boardGame[index].backgroundImage
        && !hasTree(boardGame, playerId)
    ) {
        room.gameMatch.board.boardGame = boardGameReceived
        room.gameMatch.timer = 3
        room.gameMatch.turn = !room.gameMatch.turn
        Sockets.in(room.roomName).emit('Room', room)

        const winnerID = winnerChecker(boardGameReceived, playerId)

        if (winnerID) {
            if (winnerID === room.player1.id) {
                room.player1.score += 1
                if (room.player1.score === 3) {
                    return Sockets.in(room.roomName).emit('TheWinner', winnerID)
                }
            } else {
                room.player2.score += 1
                if (room.player2.score === 3) {
                    return Sockets.in(room.roomName).emit('TheWinner', winnerID)
                }
            }

            Sockets.in(room.roomName).emit('TheWinnerRound', winnerID)
            Sockets.in(room.roomName).emit('FinishRound', true)
        }
    }
}

export { rulesTree }