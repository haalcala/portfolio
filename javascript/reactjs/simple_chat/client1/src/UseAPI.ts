import React from 'react'
import { useDispatch } from 'react-redux'

import { actions as app_actions } from './redux/app'

import { actions as ws_actions } from './redux/websocket'

export default function UseAPI() {
    const dispatch = useDispatch()

    const api = {
        async sendMessage(message) {
            dispatch(ws_actions.actionWebsocketSendMessage(message))
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
