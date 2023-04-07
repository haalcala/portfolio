import { legacy_createStore as createStore } from "redux"

import { combineReducers } from "redux"

import websocket from "./websocket"

import app from "./app"

const base_reducers = {
    app,
    websocket,
}

const store = createStore(combineReducers(base_reducers))

export default store