// @ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as HTTPServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export var io: NetServer | undefined = undefined;
var count = 0;
export function setIO(value: any) {
  io = value;
  console.log("socketio.ts initialising serverio object");
}

import type { Server as IOServer } from "socket.io";
import { Socket } from "socket.io-client";
interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}
interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}
const handler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  console.log("socketio.ts res.socket.server", res.socket.server);
  const { slug } = req.query;

  if (!io) {
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    io = new ServerIO(httpServer, { path: "/socketio" });

    // setIO(new ServerIO(httpServer, {
    //   path: "/socketio",
    // }));

    if (io) {
      // append SocketIO server to Next.js socket server response
      res.socket.server.io = io;

      io.on("connection", (socket: Socket) => {
        console.log("io.on connection");

        socket.on("socket.ping", (data: any, callback: Function) => {
          console.log("socket.ping");
          callback({ status: 200, type: "socket.ping", data: data });
        });
      });

      setInterval(() => {
        io.emit("counter", { value: count++ });
      }, 1000);
    }
  }

  let message;
  if (slug === "on") {
    message = "socket turned on";
  } else if (slug === "off") {
    message = "socket turned off";
  } else {
    message = "invalid request";
  }

  res.status(200).json({
    message: message,
    count: count,
  });
  res.end();
};

export default handler;
