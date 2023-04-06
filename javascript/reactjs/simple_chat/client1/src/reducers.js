import { combineReducers } from "redux"
import { ACTION_SEND_MESSAGE } from "./actions"

const initialState = {
    messages: [],
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SEND_MESSAGE:
        return {
            ...state,
            messages: [...state.messages, action.message]
        }
        default:
        return state
    }
    }

export const base_reducers = {
    messages,
}

export default combineReducers(base_reducers)