import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UseSelector, actions as app_actions } from './redux/app'

import { selector as ws_selector, actions as ws_actions } from './redux/websocket'

export default function UseAPI() {
    const selector = UseSelector()

    const dispatch = useDispatch()

    const connected = useSelector(ws_selector.isConnected)

    const api = {
        async sendMessage(message) {
            if (!connected) {
                setTimeout(() => {
                    dispatch(app_actions.setNewMessage({ sender: "server", msg: "echoing locally " + message, timestamp: new Date().getTime() }))
                }, 100)
            }
            else {
                dispatch(ws_actions.actionWebsocketSendMessage(message))
            }

            dispatch(app_actions.setNewMessage({ sender: "me", msg: message, timestamp: new Date().getTime() }))
        },

        async login(username, password) {
            setTimeout(() => {
                dispatch(app_actions.setLoginStatus("success", { id: username, name: username }))
            }, 1000)
        },

        setSupportMessage(msg) {
            dispatch(app_actions.setSupportMessage(msg))
        }
    }

    return api
}
