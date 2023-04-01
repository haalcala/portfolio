import { combineReducers } from "redux"
import { ACTION_INCREMENT, ACTION_DECREMENT, ACTION_INCREMENT_BY_AMOUNT } from "./actions"


function counter(state = {value:0}, action) {
    if (action.type === ACTION_INCREMENT) {
        return {...state, value: state.value + 1}
    }
    else if (action.type === ACTION_DECREMENT) {
        return {...state, value: state.value - 1}
    }
    else if (action.type === ACTION_INCREMENT_BY_AMOUNT) {
        return {...state, value: state.value + action.payload}
    }
    
    return state 
}

export const baseReducer = {
    counter,
}

export default combineReducers(baseReducer)