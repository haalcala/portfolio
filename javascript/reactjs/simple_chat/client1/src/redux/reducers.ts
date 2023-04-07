import { combineReducers } from "redux"
import * as actions from "./app"

import websocket from "./websocket"

import app from "./app"

export const base_reducers = {
    app,
    websocket,
}

export default combineReducers(base_reducers)