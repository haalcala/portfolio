import io from "socket.io-client";

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as ws_actions } from "./redux/websocket";
import { actions as app_actions } from "./redux/app";

function cleanup_websocket(ws) {
  ws.off("connect");
  ws.off("disconnect");
  ws.off("pong");
}

export default function UseWebsocket(client_id) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState(null);
  const [consoleLog, setConsoleLog] = useState<{ timestamp: number }[]>([]);

  const dispatch = useRef(useDispatch())

  // @ts-ignore
  const websocket = useSelector((state) => state?.websocket); //

  console.log("-----> websocket:", websocket);

  const ws = useRef<any>(null);

  useEffect(() => {
    console.log("-----> websocket: useEffect:", websocket.next_state)

    let socket

    if (ws.current) {
      ws.current.disconnect();
    }

    socket = io("http://" + window.location.host, { autoConnect: false, transports: ["websocket"] });
    ws.current = socket;

    if (ws.current) {
      setIsConnected(socket && socket.connected);

      socket.on('connect', () => {
        console.log("-----> websocket: connect");

        socket.emit("client_id", client_id);
        dispatch.current(ws_actions.actionWebsocketConnectSuccess());
      });

      socket.on("disconnect", () => {
        console.log("-----> websocket: disconnect");

        dispatch.current(ws_actions.actionWebsocketDisconnectSuccess());

        setIsConnected(false);
      });

      socket.on("pong", () => {
        // @ts-ignore
        setLastPong(new Date().toISOString());
      });

      socket.on("findAllMessages", (data) => {
        console.log("-----> websocket: data:", data);

        dispatch.current(app_actions.setNewMessage({ sender: "server", msg: data, timestamp: new Date().toISOString() }))
      });

      socket.on("send_lots_resp", (data) => {
        console.log("-----> websocket: data:", data);

        dispatch.current(app_actions.setNewMessage({ sender: "server", msg: data, timestamp: new Date().toISOString() }))
      });

    }

    return () => {
      if (ws.current) {
        cleanup_websocket(ws.current);
        ws.current = null;
      }
    };
  }, [ws.current]);

  useEffect(() => {
    if (ws.current) {
      if (websocket.next_state === "connect") {
        ws.current.connect();
      } else if (websocket.next_state === "disconnect") {
        ws.current.disconnect();
        cleanup_websocket(ws.current);
        ws.current = null;
      }
    }
  }, [websocket.next_state]);

  useEffect(() => {
    if (ws.current) {
      if (websocket.emit_messages.length > 0) {
        const message = websocket.emit_messages[0];
        console.log("-----> websocket: emit:", message);

        if (message === "send_lots") {
          ws.current.emit("send_lots", message);
        } else {
          ws.current.emit("findAllMessages", message);
        }


        // @ts-ignore
        dispatch.current(ws_actions.actionWebsocketSendMessageSuccess());
      }
    }
  }, [websocket.emit_messages]);

  const sendPing = () => {
    // client.send("ping")
    ws.current.emit("ping");
  };

  const send_lots = () => {
    // client.send("send_lots")
    ws.current.emit("send_lots");
  };

  function sendTime() {
    // client.send(JSON.stringify(['message', { time: new Date().getTime() }]));
    ws.current.emit("message", { time: new Date().getTime() }, (...args) =>
      console.log(args)
    );
  }

  return ws;
}
