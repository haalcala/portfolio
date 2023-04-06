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