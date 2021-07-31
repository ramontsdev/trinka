export type PlayerOnline = {
    id: string
    room: string | undefined
    name?: string | undefined
    score?: number | undefined
    myTurn?: boolean | undefined
    ready?: boolean | undefined
}
export type GameMatch = {
    player1?: PlayerOnline | undefined
    player2?: PlayerOnline | undefined
    board?: Board
    turn?: boolean
    startGame?: boolean
    timer?: number
}
export type Board = {
    room: string
    boardGame: Array<BoardButton>
}
export type BoardButton = {
    id: string
    backgroundImage: string
    index: number
}
export type Room = {
    roomName: string
    player1: PlayerOnline
    player2: PlayerOnline | undefined
    gameMatch?: GameMatch | undefined
}