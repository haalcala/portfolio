import { combineReducers } from "redux"
import { ACTION_INCREMENT, ACTION_DECREMENT, ACTION_INCREMENT_BY_AMOUNT, ACTION_ACTION1_ADD, ACTION_ACTION1_REMOVE, ACTION_ACTION2_ADD, ACTION_ACTION2_REMOVE, ACTION_ACTION3_ADD, ACTION_ACTION3_REMOVE } from "./actions"


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

function action1(state = {}, action) {
    if (action.type === ACTION_ACTION1_ADD) {
        return {...state, [action.payload.pluginId]: action.payload.elem}
    }
    else if (action.type === ACTION_ACTION1_REMOVE) {
        return {...state, [action.payload]: undefined}
    }

    return state
}

function action2(state = {}, action) {
    if (action.type === ACTION_ACTION2_ADD) {
        return {...state, [action.payload.pluginId]: action.payload.elem}
    }
    else if (action.type === ACTION_ACTION2_REMOVE) {
        return {...state, [action.payload]: undefined}
    }

    return state
}

function action3(state = {}, action) {
    if (action.type === ACTION_ACTION3_ADD) {
        return {...state, [action.payload.pluginId]: action.payload.elem}
    }
    else if (action.type === ACTION_ACTION3_REMOVE) {
        return {...state, [action.payload]: undefined}
    }

    return state
}

export const baseReducer = {
    counter,
    action1,
    action2,
    action3,
}

export default combineReducers(baseReducer)