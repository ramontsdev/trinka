import { useContext } from 'react'
import { GameContext, leaveRoom } from '../../contexts/GameContext'
import styles from './styles.module.css'

function ModalRoomCreated() {
    const { state: { player } } = useContext(GameContext)
    return (
        <div className={styles.container}>
            <div className={styles.modalWrapper}>
                <h2>Esse é o código da tua sala</h2>
                <h3>( {player.room} )</h3>
                <h3>Fala ele pro teu amigo e espera ele ficar pronto</h3>
                <input
                    type="button"
                    onClick={() => leaveRoom(player.room)}
                    value="Sair"
                />
            </div>
        </div>
    )
}

export { ModalRoomCreated }