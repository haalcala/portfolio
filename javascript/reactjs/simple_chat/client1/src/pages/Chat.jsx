import React, { useState, useEffect, useRef } from 'react';
import UseWebsocket from '../UseWebsocket';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { UseSelector, actions as app_actions } from '../redux/app';
import { actions as ws_actions } from '../redux/websocket';
import UseAPI from '../UseAPI';


export default function Chat() {


  UseWebsocket("client123-" + new Date().getTime())
  const selector = UseSelector()

  const api = UseAPI()

  const dispatch = useDispatch()

  const store = useStore()
  const state = store.getState()

  const supportMessage = selector.getSupportMsg()

  console.log("supportMessage: ", supportMessage)
  console.log("store: ", store)
  console.log("state: ", state)


  console.log("selector.getLoginStatus: ", selector.getLoginStatus())

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

    api.sendMessage(message)

    inputRef.current.focus()
  }

  const inputRef = useRef(null);

  useEffect(() => {
    if (supportMessage) {
      setMessage(supportMessage)
      api.setSupportMessage("")
    }
  }, [supportMessage])

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
      <div className="new-messages-overlay ">
        <hr color="lightgray" className="my-1 h-[2px] w-[100%]" />
        <div className="absolute z-10 top-[-10px] bg-slate-400 px-2 rounded-md border-gray-100 border-solid">
          {new_messages.length} new {new_messages.length > 1 ? 'messages' : 'message'}
        </div>
      </div>
    );
  };

  function RenderMessage(message, index) {
    return <div key={index} className={"p-2 m-2 w-[80%] rounded-md " + (message.sender == "server" ? "bg-blue-200" : "ml-auto text-right")}>
      {JSON.stringify(message)}
    </div>
  }


  return <div className="chat-container">
    <div className={"chat-header " + (websocket.connected ? "bg-[#4caf50]" : "bg-gray-400")}>
      <h2>Chat App ({(selector.getUser() || {}).id})</h2>
    </div>
    <div className="chat-messages">
      <div onScroll={handleScroll}>
        {messages.map(RenderMessage)}
        {
          new_messages.length > 0 && <div className="bg-blue-100 py-1 rounded-md">
            <NewMessagesOverlay />
            {new_messages.length > 0 && new_messages.map(RenderMessage)}
          </div>}
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
