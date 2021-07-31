import styles from '../styles/home.module.css'

import { ModalRoomCreated, ModalReadyGame } from '../components'
import { createRoom, GameContext, joinRoom } from '../contexts/GameContext'
import { useContext } from 'react'

export default function Home() {
  const { state: { player, room } } = useContext(GameContext)

  function handleJoinRoom() {
    const roomName = (document.getElementById('room-name') as HTMLInputElement).value
    joinRoom(roomName)
  }

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.button}
          type="button"
          onClick={createRoom}
          value="Criar Sala"
        />
        <input
          className={styles.input}
          type="text"
          id="room-name"
          autoComplete="off"
          placeholder="Código da sala aqui"
        />
        <input
          className={styles.button}
          type="button"
          onClick={handleJoinRoom}
          value="Entrar na Sala"
        />
      </div>
      {
        (player?.room && !room?.player2) && (
          <ModalRoomCreated />
        )
      }
      {
        room?.player2?.id && (
          <ModalReadyGame />
        )
      }
    </>
  )
}
