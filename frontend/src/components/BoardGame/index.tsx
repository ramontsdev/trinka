import { MouseEvent, useContext, useEffect, useState } from 'react'
import { BoardButton } from '../../@types'
import { GameContext, gameOver, pauseGame, sendBoard, startGameNow } from '../../contexts/GameContext'
import { Score } from '../Score'
import { ModalWinner } from '../ModalWinner'
import styles from './BoardPage.module.css'
import { useRouter } from 'next/router'


export const X = '/icons/katana.svg'
export const O = '/icons/shield.svg'

export function BoardGame() {
  const { state: { room: { gameMatch: { board, turn, startGame } }, player, theWinnerRound, theWinner, finishRound } } = useContext(GameContext)
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (theWinnerRound && !theWinner && finishRound) {
      setOpenModal(true)
      pauseGame(player)

      setTimeout(() => {
        setOpenModal(false)
      }, 3000)
    }

    if (theWinner) {
      pauseGame(player)
      setOpenModal(true)

      setTimeout(() => {
        //router.push('/')
        gameOver(player)
        setOpenModal(false)
        window.location.href = '/'
      }, 3000)
    }
  }, [theWinnerRound, theWinner, finishRound])

  function handleClick(e: MouseEvent, button: BoardButton, index: number) {
    if (player.myTurn === turn && !startGame)
      startGameNow(player)

    if (player.myTurn) {
      if (!button.id || button.id === player.id) {
        button.backgroundImage = X;
        button.id = player.id
        button.index = index
      }
    } else {
      if (!button.id || button.id === player.id) {
        button.backgroundImage = O;
        button.id = player.id
        button.index = index
      }
    }

    if (player.myTurn === turn)
      sendBoard(board, index)
  }

  return (
    <div className={styles.container}>
      <Score />
      <div className={styles.buttonsBoard}>
        {
          board?.boardGame?.map((button, index) => (
            <button
              key={index}
              style={{ backgroundImage: `url(${button.backgroundImage})` }}
              onClick={(e: MouseEvent) => handleClick(e, button, index)}
            >
            </button>
          ))
        }
      </div>

      {
        openModal && (
          <ModalWinner />
        )
      }
    </div>
  )
}
