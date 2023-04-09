import { useSelector } from "react-redux"

const ACTION_SEND_MESSAGE = 'ACTION_SEND_MESSAGE'

const ACTION_SET_NEW_MESSAGE = 'ACTION_SET_NEW_MESSAGE'
const ACTION_RECEIVE_NEW_MESSAGE = 'ACTION_RECEIVE_NEW_MESSAGE'

const ACTION_RECEIVE_MESSAGE = 'ACTION_RECEIVE_MESSAGE'

const ACTION_RECEIVE_MESSAGE_ERROR = 'ACTION_RECEIVE_MESSAGE_ERROR'

const ACTION_RECEIVE_MESSAGE_SUCCESS = 'ACTION_RECEIVE_MESSAGE_SUCCESS'

const ACTION_SET_LOGIN_STATUS = 'ACTION_SET_LOGIN_STATUS'

const ACTION_SET_SUPPORT_MSG = 'ACTION_SET_SUPPORT_MSG'



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
  },

  setLoginStatus(status, user) {
    return {
      type: ACTION_SET_LOGIN_STATUS,
      status,
      user,
    }
  },

  setSupportMessage(msg) {
    return {
      type: ACTION_SET_SUPPORT_MSG,
      msg,
    }
  },
}

export function UseSelector() {
  return {
    getLoginStatus: () => {
      return useSelector(state => state.app.login_status)
    },
    getUser: () => {
      return useSelector(state => state.app.user)
    },
    getMessages: () => {
      return useSelector(state => state.app.messages)
    },
    getNewMessages: () => {
      return useSelector(state => state.app.new_messages)
    },
    getSupportMsg: () => {
      return useSelector(state => state.app.support_msg)
    },
  }
}



const initialState = {
  messages: [],
  new_messages: [],
  login_status: "", // "login" | "logout" | "error" | "success" | "loading" | ""
  user: null, // { id, name, avatar }
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_LOGIN_STATUS:
      return {
        ...state,
        login_status: action.status,
        user: action.user,
      }
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
    case ACTION_SET_SUPPORT_MSG:
      return {
        ...state,
        support_msg: action.msg
      }

    default:
      return state
  }
}

export default app