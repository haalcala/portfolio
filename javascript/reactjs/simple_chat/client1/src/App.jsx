import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { Events } from './components/Events';
import UseWebsocket from './UseWebsocket';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';

export default function App() {
  const dispatch = useDispatch()

  const { messages } = useSelector((state) => state.messages)
  const websocket = useSelector((state) => state.websocket)

  console.log("messages: ", messages)
  console.log("websocket: ", websocket)

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
    <button onClick={() => dispatch(actions.actionWebsocketConnect())}>Connect</button>

    <button onClick={() => ws.current.emit("findAllMessages")}>Send</button>

    <button onClick={() => ws.current.emit("send_lots")}>Send Lots</button>
    <button onClick={() => dispatch(actions.sendMessage("this is from client1 " + new Date().getTime()))}>Send</button>
    {messages.map((message, index) => <div key={index}>{message}</div>)}
  </div>
}