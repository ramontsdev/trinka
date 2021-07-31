import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from 'react'
import { GameContext } from '../../contexts/GameContext'
import styles from './styles.module.css'
export const Score = () => {
    const { state: { room: { player1, player2, gameMatch: { turn, timer } }, player } } = useContext(GameContext)

    const router = useRouter()

    const refGraphicCountdown = useRef<HTMLDivElement>()
    const refTimeGame = useRef<HTMLDivElement>()

    useEffect(() => {
        if (!player1.ready || !player2.ready) {
            router.push("/")
        }
    }, [])

    useEffect(() => {
        switch (timer) {
            case 3:
                refGraphicCountdown.current.style.backgroundColor = '#00FF7F'
                refGraphicCountdown.current.style.width = '100%'
                refTimeGame.current.style.backgroundColor = '#00FF7F'
                break;
            case 2:
                refGraphicCountdown.current.style.backgroundColor = '#FFFF00'
                refGraphicCountdown.current.style.width = '66%'
                refTimeGame.current.style.backgroundColor = '#FFFF00'
                break;
            case 1:
                refGraphicCountdown.current.style.backgroundColor = '#FF0000'
                refGraphicCountdown.current.style.width = '33%'
                refTimeGame.current.style.backgroundColor = '#FF0000'
                break;
            default:
                break;
        }
    }, [timer])
    return (
        <div className={styles.container}>
            <div className={styles.containerScore}>
                {
                    turn
                        ? (
                            <div className={`${styles.namePlayerLeft}`}
                                style={{ backgroundColor: '#00FF7F' }}
                            >
                                <p>{player1.name === player.name ? player.name : player1.name}</p>
                            </div>
                        )
                        : (
                            <div className={`${styles.namePlayerLeft}`}
                            >
                                <p>{player1.name === player.name ? player.name : player1.name}</p>
                            </div>
                        )
                }
                <div className={styles.scorePlayer}>
                    <p>{player1.score}</p>
                </div>
                <div className={styles.timeGame} ref={refTimeGame}>
                    {timer}
                </div>
                <div className={styles.scorePlayer}>
                    <p>{player2.score}</p>
                </div>
                {
                    !turn
                        ? (
                            <div className={`${styles.namePlayerLeft}`}
                                style={{ backgroundColor: '#00FF7F' }}
                            >
                                <p>{player2.name === player.name ? player.name : player2.name}</p>
                            </div>
                        )
                        : (
                            <div className={`${styles.namePlayerLeft}`}
                            >
                                <p>{player2.name === player.name ? player.name : player2.name}</p>
                            </div>
                        )
                }
            </div>
            <div className={styles.graphicCountdownWrapper}>
                <div className={styles.graphicCountdown} ref={refGraphicCountdown}>
                </div>
            </div>
        </div>
    )
}