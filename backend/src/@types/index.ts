type PlayerOnline = {
    id: string
    room: string | undefined
    name?: string | undefined
    score?: number | undefined
    myTurn?: boolean | undefined
    ready?: boolean | undefined
}
type Room = {
    roomName: string
    player1: PlayerOnline
    player2: PlayerOnline | undefined
    gameMatch?: GameMatch | undefined
}
type Board = {
    roomName: string
    boardGame: Array<BoardButton>
}
type GameMatch = {
    player1: PlayerOnline | undefined
    player2: PlayerOnline | undefined
    board: Board
    turn: boolean
    startGame: boolean
    timer: number
}
type BoardButton = {
    id: string
    backgroundImage: string
    index: number
}

export { PlayerOnline, Room, Board, GameMatch, BoardButton }