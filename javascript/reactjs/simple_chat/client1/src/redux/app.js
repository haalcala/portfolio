const ACTION_SEND_MESSAGE = 'ACTION_SEND_MESSAGE'

const ACTION_RECEIVE_MESSAGE = 'ACTION_RECEIVE_MESSAGE'

const ACTION_RECEIVE_MESSAGE_ERROR = 'ACTION_RECEIVE_MESSAGE_ERROR'

const ACTION_RECEIVE_MESSAGE_SUCCESS = 'ACTION_RECEIVE_MESSAGE_SUCCESS'

export const actions = {
  sendMessage(message) {
    return {
      type: ACTION_SEND_MESSAGE,
      message,
    }
  },

  receiveMessage(message) {
    return {
      type: ACTION_RECEIVE_MESSAGE,
      message,
    }
  }
}

const initialState = {
  messages: [],
}

const app = (state = initialState, action) => {
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

export default app