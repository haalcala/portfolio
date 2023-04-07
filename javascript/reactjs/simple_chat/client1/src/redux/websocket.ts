
const ACTION_WEBSOCKET_NEXT_STATE = 'ACTION_WEBSOCKET_NEXT_STATE'

const ACTION_WEBSOCKET_CONNECT = 'ACTION_WEBSOCKET_CONNECT'

const ACTION_WEBSOCKET_CONNECT_SUCCESS = 'ACTION_WEBSOCKET_CONNECT_SUCCESS'

const ACTION_WEBSOCKET_CONNECT_ERROR = 'ACTION_WEBSOCKET_CONNECT_ERROR'

const ACTION_WEBSOCKET_DISCONNECT = 'ACTION_WEBSOCKET_DISCONNECT'

const ACTION_WEBSOCKET_DISCONNECT_SUCCESS = 'ACTION_WEBSOCKET_DISCONNECT_SUCCESS'

const ACTION_WEBSOCKET_DISCONNECT_ERROR = 'ACTION_WEBSOCKET_DISCONNECT_ERROR'

const ACTION_WEBSOCKET_SEND_MESSAGE = 'ACTION_WEBSOCKET_SEND_MESSAGE'

const ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS = 'ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS'

const ACTION_WEBSOCKET_SEND_MESSAGE_ERROR = 'ACTION_WEBSOCKET_SEND_MESSAGE_ERROR'

const ACTION_WEBSOCKET_RECEIVE_MESSAGE = 'ACTION_WEBSOCKET_RECEIVE_MESSAGE'

const ACTION_WEBSOCKET_RECEIVE_MESSAGE_SUCCESS = 'ACTION_WEBSOCKET_RECEIVE_MESSAGE_SUCCESS'

const ACTION_WEBSOCKET_RECEIVE_MESSAGE_ERROR = 'ACTION_WEBSOCKET_RECEIVE_MESSAGE_ERROR'


export const actions = {
    actionWebsocketConnect() {
        return {
            type: ACTION_WEBSOCKET_NEXT_STATE,
            payload: "connect"
        }
    },

    actionWebsocketConnectSuccess() {
        return {
            type: ACTION_WEBSOCKET_CONNECT_SUCCESS,
        }
    },

    actionWebsocketConnectError(error) {
        return {
            type: ACTION_WEBSOCKET_CONNECT_ERROR,
            payload: error,
        }
    },

    actionWebsocketDisconnect() {
        return {
            type: ACTION_WEBSOCKET_NEXT_STATE,
            payload: "disconnect"
        }
    },

    actionWebsocketDisconnectSuccess() {
        return {
            type: ACTION_WEBSOCKET_DISCONNECT_SUCCESS,
        }
    },

    actionWebsocketDisconnectError(error) {
        return {
            type: ACTION_WEBSOCKET_DISCONNECT_ERROR,
            error,
        }
    },

    actionWebsocketSendMessage(message) {
        return {
            type: ACTION_WEBSOCKET_SEND_MESSAGE,
            payload: message,
        }
    },

    actionWebsocketSendMessageSuccess() {
        return {
            type: ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS,
        }
    },

    actionWebsocketSendMessageError(error) {
        return {
            type: ACTION_WEBSOCKET_SEND_MESSAGE_ERROR,
            error,
        }
    },

    actionWebsocketReceiveMessage(message) {
        return {
            type: ACTION_WEBSOCKET_RECEIVE_MESSAGE,
            payload: message,
        }
    },

    actionWebsocketReceiveMessageSuccess() {
        return {
            type: ACTION_WEBSOCKET_RECEIVE_MESSAGE_SUCCESS,
        }
    },

    actionWebsocketReceiveMessageError(error) {
        return {
            type: ACTION_WEBSOCKET_RECEIVE_MESSAGE_ERROR,
            error,
        }
    },


}


const websocket = (state: { emit_messages: [], messages?, connected, next_state } = { emit_messages: [], connected: false, next_state: "", }, action) => {
    console.log("--------------------------------- websocket state", state)

    switch (action.type) {
        case ACTION_WEBSOCKET_NEXT_STATE:
            return {
                ...(state || {}),
                next_state: action.payload
            }
        case ACTION_WEBSOCKET_CONNECT_SUCCESS:
            return {
                ...(state || {}),
                connected: true,
                next_state: ""
            }
        case ACTION_WEBSOCKET_CONNECT_ERROR:
            return {
                ...(state || {}),
                connected: false,
                next_state: ""
            }
        case ACTION_WEBSOCKET_DISCONNECT:
            return {
                ...(state || {}),
                next_state: ""
            }
        case ACTION_WEBSOCKET_DISCONNECT_SUCCESS:
            return {
                ...(state || {}),
                connected: false
            }
        case ACTION_WEBSOCKET_DISCONNECT_ERROR:
            return {
                ...(state || {}),
                connected: true
            }
        case ACTION_WEBSOCKET_SEND_MESSAGE:
            if (!state.connected) {
                return state
            }

            return {
                ...(state || {}),
                // @ts-ignore
                emit_messages: [...(state || {})?.emit_messages, action.payload]
            }
        case ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS:
            return {
                ...(state || {}),
                emit_messages: [...state.emit_messages.slice(1)],
            }
        case ACTION_WEBSOCKET_SEND_MESSAGE_ERROR:
            return {
                ...(state || {}),
                emit_messages: [...state.emit_messages.slice(1)],
            }
        case ACTION_WEBSOCKET_RECEIVE_MESSAGE:
            return {
                ...(state || {}),
                messages: [...(state || {})?.messages, action.payload]
            }
        case ACTION_WEBSOCKET_RECEIVE_MESSAGE_SUCCESS:
            return {
                ...(state || {}),
                messages: [...(state || {})?.messages, action.payload]
            }
        default:
            return state
    }
}

export default websocket