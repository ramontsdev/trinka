import { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

export default function Admin() {
    const { state: { allPlayersOnline } } = useContext(GameContext)
    return (
        <div>
            {
                allPlayersOnline.map(player => (
                    <p>{player.id}</p>
                ))
            }
        </div>
    )
}