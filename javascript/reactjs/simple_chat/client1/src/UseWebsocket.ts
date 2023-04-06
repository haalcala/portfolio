import io from "socket.io-client";

import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "./actions";

export default function UseWebsocket(client_id, onMessage) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState(null);
  const [consoleLog, setConsoleLog] = useState<{ timestamp: number }[]>([]);

  const dispatch = useRef(useDispatch())


  const ws = useRef<any>(null);

  useEffect(() => {
    let socket

    if (!ws.current) {
    socket = io("http://" + window.location.host, { transports: ["websocket"] });
  }
  
    ws.current = socket;

    if (ws.current) {
      setIsConnected(socket && socket.connected);

      socket.on('connect', () => {
        console.log("-----> websocket: connect");

        socket.emit("client_id", client_id);
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on("pong", () => {
        // @ts-ignore
        setLastPong(new Date().toISOString());
      });

      socket.on("findAllMessages", (data) => {
        console.log("-----> websocket: data:", data);

        if (onMessage) {
          dispatch.current(sendMessage(data))
          // onMessage(["findAllMessages",data]);
        }

        // addToConsole(data);
      });

      socket.on("send_lots_resp", (data) => {
        console.log("-----> websocket: data:", data);

        if (onMessage) {
          dispatch.current(sendMessage(data))
          // onMessage(["findAllMessages",data]);
        }

        // addToConsole(data);
      });

    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

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
