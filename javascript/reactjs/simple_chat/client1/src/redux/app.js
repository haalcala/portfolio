const ACTION_SEND_MESSAGE = 'ACTION_SEND_MESSAGE'

const ACTION_SET_NEW_MESSAGE = 'ACTION_SET_NEW_MESSAGE'
const ACTION_RECEIVE_NEW_MESSAGE = 'ACTION_RECEIVE_NEW_MESSAGE'

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
  setNewMessage(message) {
    return {
      type: ACTION_SET_NEW_MESSAGE,
      message,
    }
  },
  receiveNewMessage() {
    return {
      type: ACTION_RECEIVE_NEW_MESSAGE,
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
  new_messages: []
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    case ACTION_SET_NEW_MESSAGE:
      return {
        ...state,
        new_messages: [...state.new_messages, action.message]
      }
    case ACTION_RECEIVE_NEW_MESSAGE:
      const new_message = state.new_messages[0]

      return {
        ...state,
        new_messages: [...state.new_messages.slice(1)],
        messages: [...state.messages, new_message]
      }
    default:
      return state
  }
}

export default app