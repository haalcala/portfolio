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

// ACTION1
export const ACTION_ACTION1_ADD = 'action1/add'

export const ACTION_ACTION1_REMOVE = 'action1/remove'

export function action1AddReq(pluginId, elem) {
    return {
        type: ACTION_ACTION1_ADD,
        payload: {pluginId, elem},
    }
}

export function action1RemoveReq(pluginId) {
    return {
        type: ACTION_ACTION1_REMOVE,
        payload: pluginId,
    }
}

// ACTION2
export const ACTION_ACTION2_ADD = 'action2/add'

export const ACTION_ACTION2_REMOVE = 'action2/remove'

export function action2AddReq(pluginId, elem) {
    return {
        type: ACTION_ACTION2_ADD,
        payload: {pluginId, elem},
    }
}

export function action2RemoveReq(pluginId, elem) {
    return {
        type: ACTION_ACTION2_REMOVE,
        payload: pluginId,
    }
}

// ACTION3
export const ACTION_ACTION3_ADD = 'action3/add'

export const ACTION_ACTION3_REMOVE = 'action3/remove'

export function action3AddReq(pluginId, elem) {
    return {
        type: ACTION_ACTION3_ADD,
        payload: {pluginId, elem},
    }
}

export function action3RemoveReq(pluginId, elem) {
    return {
        type: ACTION_ACTION3_REMOVE,
        payload: pluginId,
    }
}