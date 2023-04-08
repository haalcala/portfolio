import React, { useState, useEffect, useRef } from 'react';
import UseWebsocket from './UseWebsocket';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { actions as app_actions } from './redux/app';
import { actions as ws_actions } from './redux/websocket';
import UseAPI from './UseAPI';


export default function App() {


  UseWebsocket("client123")

  const api = UseAPI()


  const dispatch = useDispatch()

  const store = useStore()
  const state = store.getState()

  console.log("store: ", store)
  console.log("state: ", state)

  const { messages, new_messages } = useSelector((state) => state.app)
  const websocket = useSelector((state) => state.websocket)

  console.log("messages: ", messages)
  console.log("new_messages: ", new_messages)
  console.log("App.jsx:: websocket: ", websocket)

  const [message, setMessage] = useState("")

  function handleOnChange(e) {
    setMessage(e.target.value)
  }

  function handleOnClick() {
    setMessage("")
    dispatch(ws_actions.actionWebsocketSendMessage(message))
    dispatch(app_actions.setNewMessage({ sender: "me", msg: message, timestamp: new Date().getTime() }))
    inputRef.current.focus()
  }

  const inputRef = useRef(null);

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

  // return <div className="h-[calc(100vh-50px)] w-[100vw] flex flex-col p-2 justify-end" style={{ border: "1px solid red" }}>
  //   <div className="message_box" style={{ border: "1px solid grey" }}>
  //     {messages.map((message, index) => <div key={index}>{message}</div>)}
  //   </div>
  //   <div className="m-2 flex flex-col justify-between justify-stretch">
  //     <div className="bg-red-400">
  //       <input className="w-[100%]" type="text" value={message} onChange={handleOnChange} />
  //     </div>
  //     <div>
  //       {websocket.connected && <button onClick={() => dispatch(ws_actions.actionWebsocketDisconnect())}>Disconnect</button>}
  //       {!websocket.connected && <button onClick={() => dispatch(ws_actions.actionWebsocketConnect())}>Connect</button>}

  //       <button onClick={handleOnClick}>Send</button>

  //       <button onClick={() => dispatch(ws_actions.actionWebsocketSendMessage("send_lots"))}>Send Lots</button>
  //       <button onClick={() => dispatch(ws_actions.actionWebsocketSendMessage("this is from client1 " + new Date().getTime()))}>Send</button>

  //     </div>


  //   </div>

  // </div>
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  const [isScrolledUp, setIsScrolledUp] = useState(false);
  console.log("isScrolledUp: ", isScrolledUp)

  useEffect(() => {
    if (!isScrolledUp) {
      scrollToBottom();
    }
  }, [messages, new_messages]);


  const handleScroll = (e) => {
    const isScrolledToBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    setIsScrolledUp(!isScrolledToBottom);
  };

  useEffect(() => {
    if (!isScrolledUp && new_messages.length > 0) {
      dispatch(app_actions.receiveNewMessage())
    }
  }, [new_messages])


  function NewMessagesOverlay() {
    return (
      <div className="new-messages-overlay">
        <hr color="lightgray" className="my-1 h-[2px] w-[100%]" />
        <div className="absolute z-10 top-[-10px] bg-white px-1">
          {new_messages.length} new {new_messages.length > 1 ? 'messages' : 'message'}

        </div>
      </div>
    );
  };

  function RenderMessage(message, index) {
    return <div key={index} className={"p-5 w-[80%] rounded-md " + (message.sender == "server" ? "bg-blue-200" : "ml-auto text-right")}>
      {JSON.stringify(message)}
    </div>
  }


  return <div className="chat-container">
    <div className={"chat-header " + (websocket.connected ? "bg-[#4caf50]" : "bg-gray-400")}>
      <h2>Chat App</h2>
    </div>
    <div className="chat-messages">
      <div onScroll={handleScroll}>
        {messages.map(RenderMessage)}
        {new_messages.length > 0 && <NewMessagesOverlay />}
        {new_messages.length > 0 && new_messages.map(RenderMessage)}
        <div ref={messagesEndRef} />
      </div>

    </div>
    <div className="chat-input">
      <input id="message" ref={inputRef} className="w-[100%]" type="text" value={message} onChange={handleOnChange} placeholder="Type your message..." />
      <button onClick={handleOnClick}>Send</button>
      {websocket.connected && <button onClick={() => dispatch(ws_actions.actionWebsocketDisconnect())}>Disconnect</button>}
      {!websocket.connected && <button onClick={() => dispatch(ws_actions.actionWebsocketConnect())}>Connect</button>}
    </div>
  </div>
}
