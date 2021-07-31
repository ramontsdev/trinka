import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { BoardGame } from '../components/BoardGame'
import { GameContext } from '../contexts/GameContext'

export default function Game() {
    const { state: { room: { player1, player2 } } } = useContext(GameContext)

    const router = useRouter()

    useEffect(() => {
        if (!player1?.ready || !player2?.ready) {
            router.push("/")
        }
    }, [])
    return (
        <BoardGame />
    )
}