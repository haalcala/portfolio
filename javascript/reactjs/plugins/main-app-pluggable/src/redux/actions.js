export const ACTION_INCREMENT = 'counter/increment'

export const ACTION_DECREMENT = 'counter/decrement'

export const ACTION_INCREMENT_BY_AMOUNT = 'counter/incrementByAmount'

export function incrementReq() {
    return {
        type: ACTION_INCREMENT,
    }
}

export function decrementReq() {
    return {
        type: ACTION_DECREMENT,
    }
}

export function incrementByAmountReq(amount) {
    return {
        type: ACTION_INCREMENT_BY_AMOUNT,
        payload: amount,
    }
}