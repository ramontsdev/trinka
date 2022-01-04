import { createContext, ReactNode, useEffect, useReducer } from "react"
import socketIoClient, { Socket } from "socket.io-client"
import { Board, PlayerOnline, Room } from "../@types"
import { boardButtons } from "../mock/Buttons"

type Props = {
  children: ReactNode
}
type GameContextType = {
  state: State
}
type State = {
  allPlayersOnline: Array<PlayerOnline>
  player: PlayerOnline
  room: Room,
  theWinnerRound: string
  theWinner: string
  finishRound: boolean
}
type Action = {
  type: string
  payload: any
}
export const GameContext = createContext({} as GameContextType)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'AllPlayersOnline':
      return {
        ...state,
        allPlayersOnline: action.payload
      }
    case 'Me':
      return {
        ...state,
        player: action.payload
      }
    case 'JoinedAPlayer':
      return {
        ...state,
        room: action.payload
      }
    case 'Room':
      return {
        ...state,
        room: action.payload
      }
    case 'TheWinnerRound':
      return {
        ...state,
        theWinnerRound: action.payload
      }
    case 'TheWinner':
      return {
        ...state,
        theWinner: action.payload
      }
    case 'FinishRound':
      return {
        ...state,
        finishRound: action.payload
      }
    default:
      return state
  }
}
const initialState: State = {
  allPlayersOnline: [],
  player: { name: '' } as PlayerOnline,
  room: {
    player1: { name: '' },
    player2: { name: '' },
    gameMatch: {
      board: {
        boardGame: boardButtons
      }
    }
  } as Room,
  theWinnerRound: '',
  theWinner: '',
  finishRound: false
}

const url = 'https://backend-trinka.herokuapp.com/' // || 'http://192.168.0.101:7000'
let socket: Socket
export function GameContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    socket = socketIoClient(`${url}`, {
      autoConnect: false,
      transports: ['websocket'],
      forceNew: true,
      upgrade: false
    })
    socket.on('AllPlayersOnline', (allPlayersOnline: Array<PlayerOnline>) => {
      dispatch({ type: 'AllPlayersOnline', payload: allPlayersOnline })
    })
    socket.on('Me', (player: PlayerOnline) => {
      dispatch({ type: 'Me', payload: player })
    })
    socket.on('JoinedAPlayer', (room: Room) => {
      dispatch({ type: 'JoinedAPlayer', payload: room })
    })
    socket.on('Room', (room: Room) => {
      dispatch({ type: 'Room', payload: room })
    })
    socket.on('TheWinnerRound', (winnerID: string) => {
      dispatch({ type: 'TheWinnerRound', payload: winnerID })
    })
    socket.on('TheWinner', (theWinnerID: string) => {
      dispatch({ type: 'TheWinner', payload: theWinnerID })
    })
    socket.on('FinishRound', (finishRound) => {
      dispatch({ type: 'FinishRound', payload: finishRound })
    })
    socket.on('connect', () => { })
    socket.open()
  }, [])

  return (
    <GameContext.Provider
      value={{ state }}
    >
      {children}
    </GameContext.Provider>
  )
}
function createRoom() {
  socket.emit('CreateRoom')
}
function joinRoom(roomName: string) {
  socket.emit('JoinRoom', roomName)
}
function leaveRoom(roomName: string) {
  socket.emit('LeaveRoom', roomName)
}
function readyIm(playerName: string, player: PlayerOnline) {
  socket.emit('ImReady', ({ playerName, player }))
}
function sendBoard(board: Board, index: number) {
  socket.emit('SendedBoard', board, index)
}
function startGameNow(player: PlayerOnline) {
  socket.emit('StartGame', player)
}
function pauseGame(player: PlayerOnline) {
  socket.emit('PauseGame', player)
}
function gameOver(player: PlayerOnline) {
  socket.emit('GameOver', player)
}
export { createRoom, leaveRoom, joinRoom, readyIm, sendBoard, startGameNow, pauseGame, gameOver }