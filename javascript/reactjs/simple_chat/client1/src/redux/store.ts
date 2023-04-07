import { legacy_createStore } from "redux"

import { combineReducers } from "redux"

import websocket from "./websocket"

import app from "./app"

const base_reducers = {
    app,
    websocket,
}

const store = legacy_createStore(combineReducers(base_reducers))

export default store