import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { Events } from './components/Events';
import UseWebsocket from './UseWebsocket';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { actions as app_actions } from './redux/app';
import { actions as ws_actions } from './redux/websocket';

export default function App() {
  const dispatch = useDispatch()

  const store = useStore()
  const state = store.getState()

  console.log("store: ", store)
  console.log("state: ", state)

  const { messages } = useSelector((state) => state.app)
  const websocket = useSelector((state) => state.websocket)

  console.log("messages: ", messages)
  console.log("App.jsx:: websocket: ", websocket)

  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  // useEffect(() => {
  //   function onConnect() {
  //     console.log("onConnect()")
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     console.log("onDisconnect()")
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value) {
  //     console.log("onFooEvent(value)")

  //     setFooEvents(previous => [...previous, value]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);

  // return (
  //   <div className="App">
  //     <ConnectionState isConnected={isConnected} />
  //     <Events events={fooEvents} />
  //     <ConnectionManager />
  //     <MyForm />
  //   </div>
  // );


  const ws = UseWebsocket("client123", (msg) => {
    console.log("msg: ", msg)
  })

  return <div>
    {websocket.connected && <button onClick={() => dispatch(ws_actions.actionWebsocketDisconnect())}>Disconnect</button>}
    {!websocket.connected && <button onClick={() => dispatch(ws_actions.actionWebsocketConnect())}>Connect</button>}

    <button onClick={() => dispatch(ws_actions.actionWebsocketSendMessage("findAllMessages"))}>Send</button>

    <button onClick={() => dispatch(ws_actions.actionWebsocketSendMessage("send_lots"))}>Send Lots</button>
    <button onClick={() => dispatch(ws_actions.actionWebsocketSendMessage("this is from client1 " + new Date().getTime()))}>Send</button>
    {messages.map((message, index) => <div key={index}>{message}</div>)}
  </div>
}