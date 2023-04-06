export const ACTION_SEND_MESSAGE = 'ACTION_SEND_MESSAGE'

export const ACTION_RECEIVE_MESSAGE = 'ACTION_RECEIVE_MESSAGE'

export const ACTION_RECEIVE_MESSAGE_ERROR = 'ACTION_RECEIVE_MESSAGE_ERROR'

export const ACTION_RECEIVE_MESSAGE_SUCCESS = 'ACTION_RECEIVE_MESSAGE_SUCCESS'

export function sendMessage(message) {
  return {
    type: ACTION_SEND_MESSAGE,
    message,
  }
}

export function receiveMessage(message) {
  return {
    type: ACTION_RECEIVE_MESSAGE,
    message,
  }
}




export const ACTION_WEBSOCKET_CONNECT = 'ACTION_WEBSOCKET_CONNECT'

export const ACTION_WEBSOCKET_CONNECT_SUCCESS = 'ACTION_WEBSOCKET_CONNECT_SUCCESS'

export const ACTION_WEBSOCKET_CONNECT_ERROR = 'ACTION_WEBSOCKET_CONNECT_ERROR'

export const ACTION_WEBSOCKET_DISCONNECT = 'ACTION_WEBSOCKET_DISCONNECT'

export const ACTION_WEBSOCKET_DISCONNECT_SUCCESS = 'ACTION_WEBSOCKET_DISCONNECT_SUCCESS'

export const ACTION_WEBSOCKET_DISCONNECT_ERROR = 'ACTION_WEBSOCKET_DISCONNECT_ERROR'

export const ACTION_WEBSOCKET_SEND_MESSAGE = 'ACTION_WEBSOCKET_SEND_MESSAGE'

export const ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS = 'ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS'

export const ACTION_WEBSOCKET_SEND_MESSAGE_ERROR = 'ACTION_WEBSOCKET_SEND_MESSAGE_ERROR'

export function actionWebsocketConnect() {
  return {
    type: ACTION_WEBSOCKET_CONNECT,
  }
}

export function actionWebsocketConnectSuccess() {
  return {
    type: ACTION_WEBSOCKET_CONNECT_SUCCESS,
  }
}

export function actionWebsocketConnectError(error) {
  return {
    type: ACTION_WEBSOCKET_CONNECT_ERROR,
    error,
  }
}

export function actionWebsocketDisconnect() {
  return {
    type: ACTION_WEBSOCKET_DISCONNECT,
  }
}

export function actionWebsocketDisconnectSuccess() {
  return {
    type: ACTION_WEBSOCKET_DISCONNECT_SUCCESS,
  }
}

export function actionWebsocketDisconnectError(error) {
  return {
    type: ACTION_WEBSOCKET_DISCONNECT_ERROR,
    error,
  }
}

export function actionWebsocketSendMessage(message) {
  return {
    type: ACTION_WEBSOCKET_SEND_MESSAGE,
    message,
  }
}

export function actionWebsocketSendMessageSuccess() {
  return {
    type: ACTION_WEBSOCKET_SEND_MESSAGE_SUCCESS,
  }
}

export function actionWebsocketSendMessageError(error) {
  return {
    type: ACTION_WEBSOCKET_SEND_MESSAGE_ERROR,
    error,
  }
}

