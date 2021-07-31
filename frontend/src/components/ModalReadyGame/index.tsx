import { useContext, useEffect } from 'react'
import { GameContext, readyIm } from '../../contexts/GameContext'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

function ModalReadyGame() {
    const { state: { room, player } } = useContext(GameContext)

    const router = useRouter()

    function handleReady() {
        const playerName = (document.getElementById('player-name') as HTMLInputElement).value
        readyIm(playerName, player)
    }

    useEffect(() => {
        if (room.player1.ready && room.player2.ready) {
            router.push('/game')
        }
    }, [room])

    return (
        <div className={styles.container}>
            {
                !player?.ready
                    ? (
                        <div className={styles.modalWrapper}>
                            {
                                (room.player2.id === player.id)
                                    ? <h2>Te liga que tu joga depois.<br />Põe aí teu nome e fica pronto.</h2>
                                    : <h2>Tu quem começa, bicho.<br />Põe aí teu nome e fica pronto.</h2>
                            }
                            <input
                                id="player-name"
                                type="text"
                                autoComplete="off"
                                placeholder="Nome primeiro"
                            />
                            <br />
                            <br />
                            <input
                                type="button"
                                onClick={handleReady}
                                value="Tô pronto!"
                            />
                        </div>
                    )
                    : (
                        <div className={styles.modalWrapper}>
                            <h2>Agora espera...</h2>
                        </div>
                    )
            }
        </div>
    )
}

export { ModalReadyGame }