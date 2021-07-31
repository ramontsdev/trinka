import { BoardButton } from "../@types"

function winnerChecker(buttonsArray: Array<BoardButton>, socketId: string) {

    //Checa na horizontal
    if (
        buttonsArray[0].id === socketId
        && buttonsArray[1].id === socketId
        && buttonsArray[2].id === socketId
    ) {
        return `${socketId}`
    }

    if (
        buttonsArray[3].id === socketId
        && buttonsArray[4].id === socketId
        && buttonsArray[5].id === socketId
    ) {
        return `${socketId}`
    }

    if (
        buttonsArray[6].id === socketId
        && buttonsArray[7].id === socketId
        && buttonsArray[8].id === socketId
    ) {
        return `${socketId}`
    }

    //Checa da Vertical

    if (
        buttonsArray[0].id === socketId
        && buttonsArray[3].id === socketId
        && buttonsArray[6].id === socketId
    ) {
        return `${socketId}`
    }

    if (
        buttonsArray[1].id === socketId
        && buttonsArray[4].id === socketId
        && buttonsArray[7].id === socketId
    ) {
        return `${socketId}`
    }

    if (
        buttonsArray[2].id === socketId
        && buttonsArray[5].id === socketId
        && buttonsArray[8].id === socketId
    ) {
        return `${socketId}`
    }

    //Checa na diagonal

    if (
        buttonsArray[0].id === socketId
        && buttonsArray[4].id === socketId
        && buttonsArray[8].id === socketId
    ) {
        return `${socketId}`
    }

    if (
        buttonsArray[2].id === socketId
        && buttonsArray[4].id === socketId
        && buttonsArray[6].id === socketId
    ) {
        return `${socketId}`
    }

    return false
}

export { winnerChecker }