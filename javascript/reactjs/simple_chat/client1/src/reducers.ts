import { combineReducers } from "redux"
import * as actions from "./actions"

const initialState = {
    messages: [],
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case actions.ACTION_SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        default:
            return state
    }
}

const websocket = (state: { messages?} | null = null, action) => {
    switch (action.type) {
        case actions.ACTION_WEBSOCKET_CONNECT:
            return {
                ...(state || {}),
                connected: true
            }
        case actions.ACTION_WEBSOCKET_CONNECT_SUCCESS:
            return {
                ...(state || {}),
                connected: true
            }
        case actions.ACTION_WEBSOCKET_CONNECT_ERROR:
            return {
                ...(state || {}),
                connected: false
            }
        case actions.ACTION_WEBSOCKET_DISCONNECT:
            return {
                ...(state || {}),
                connected: false
            }
        case actions.ACTION_WEBSOCKET_DISCONNECT_SUCCESS:
            return {
                ...(state || {}),
                connected: false
            }
        case actions.ACTION_WEBSOCKET_DISCONNECT_ERROR:
            return {
                ...(state || {}),
                connected: true
            }
        case actions.ACTION_WEBSOCKET_SEND_MESSAGE:
            return {
                ...(state || {}),
                messages: [...(state || {})?.messages, action.message]
            }
        case actions.ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS:
            return {
                ...(state || {}),
                messages: [...(state || {})?.messages, action.message]
            }
        case actions.ACTION_WEBSOCKET_SEND_MESSAGE_ERROR:
            return {
                ...(state || {}),
                messages: [...(state || {})?.messages, action.message]
            }
        default:
            return state
    }
}

export const base_reducers = {
    messages,
    websocket,
}

export default combineReducers(base_reducers)