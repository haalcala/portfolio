import { manifest } from "@/manifest"

const PLUGIN_ID = manifest.id

export const ACTION_INCREMENT = PLUGIN_ID + '_counter/increment'

export const ACTION_DECREMENT = PLUGIN_ID + '_counter/decrement'

export const ACTION_INCREMENT_BY_AMOUNT = PLUGIN_ID + '_counter/incrementByAmount'


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