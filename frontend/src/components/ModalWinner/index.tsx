//import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import styles from './styles.module.css'

function ModalWinner() {
    const [message, setMessage] = useState('')
    const { state: { theWinnerRound, player, theWinner } } = useContext(GameContext)

    //const router = useRouter()

    useEffect(() => {
        console.log(`Eu: ${player.id} O player que venceu: ${theWinnerRound}`)
        if (theWinner) {
            if (theWinner === player.id) {
                setMessage('Você ganhou a partida!')
            } else {
                setMessage('Você perdeu a partida!')
            }
        } else {
            if (theWinnerRound === player.id) {
                setMessage('Você venceu esse round!')
            } else {
                setMessage('Você perdeu esse round!')
            }
        }
    }, [theWinnerRound, theWinner])

    /* function redirect() {
        router.push('/')
    } */

    return (
        <div className={styles.container}>
            <div className={styles.modalWrapper}>
                <h2>{message}</h2>
                {/* {
                    theWinner && (
                        <input
                            type="button"
                            onClick={redirect}
                            value="Sair"
                        />
                    )
                } */}
            </div>
        </div>
    )
}

export { ModalWinner }