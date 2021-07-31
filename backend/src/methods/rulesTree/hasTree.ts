import { BoardButton } from "../../@types"

function hasTree(boardGame: Array<BoardButton>, playerId: string) {
    let count = 0
    boardGame.forEach(button => {
        if (button.id === playerId) {
            count++
        }
    })
    if (count === 3) {
        return true
    } else {
        return false
    }
}

export { hasTree }