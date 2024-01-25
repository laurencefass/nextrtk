import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import type { Socket as NetSocket } from "net"
import type { Server as HTTPServer } from "http"
import type { Server as IOServer } from "socket.io"
import { Socket } from "socket.io-client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export var io : NetServer | undefined = undefined;
var counterHandle: NodeJS.Timeout | null = null;
var count = 0;
var status = "socket off";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}
interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

function counterStart() {
    if (io) {
        if (!counterHandle) {
            counterHandle = setInterval(()=> {
                io?.emit("socket.counter", { value: count++ })
            }, 1000); 
            return  "counter started";   
        }
        return "counter started (noop) - already running"
    }
    return "counterStart noop. socket is off"
}

function counterStop() {
    if (io) {
        if (counterHandle) {
            clearInterval(counterHandle);
            counterHandle = null;
            return "counter stopped"    
        }
        io?.emit("socket.counter", { value: count })
        return ("counter stop (noop) - counter not started");
    }
    return "counterStop noop. socket is off."
}

function counterReset() {
    let handle = counterHandle ? true : false;
    if (handle) counterStop();
    count = 0;
    if (handle) counterStart();
    console.log("counterReset", io ? true : false);
    if (io) {
        console.log("emit counter=0")
        io?.emit("socket.counter", { value: 0 })
    }
    return "counter reset"
}

function socketOff(res: NextApiResponseWithSocket) {
    if (io) {
        io?.emit("socket.status", { 
            status: "socket off",
        });
    }

    if (io) {
        io.removeAllListeners();
        io.closeAllConnections();
        counterStop();
        // io.close();
        io = undefined; 
    }
    return "socket off"; 
}

function socketOn(res: NextApiResponseWithSocket) {
    if (io) {
        return "socket on"
    }
    try {
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as SocketServer;
        io = new ServerIO(httpServer, { 
            path: "/socketio",
            cors: {
                origin: ["*"]
            }
        }) as any;
    } catch (e: any) {
        return "socket on exception " + e?.message;
    }

    if (io) {
        console.log("initialising res.socket.server");

        // append SocketIO server to exposed Next.js socket server
        res.socket.server.io = io as any;

        io.on("connection", (socket: Socket) => {
            console.log("client connected with socket id: ", socket.id);

            socket.on('disconnect', () => {
                console.log('Client disconnected with socket id:', socket.id);
            });

            socket.on('socket.ping', (data: any, callback: Function) => {
                console.log("emitting socket.pong", data);
                // this will transmit to all connected clients
                io?.emit("socket.pong", { type: 'socket.pong', data: "pong" })

                // this will only be returned to the emitting client
                // callback({ status: 200, type: 'socket.ping', data: "pong" });
            });

        })
    } else {
        return "socketOn - error creating socket"
    }
    return "socket on"
}

const handler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  const { slug } = req.query;
  console.log("socketio.ts handler", slug);
  switch(slug) {
    case 'on':
        status = socketOn(res);
        break;
    case 'off':
        status = socketOff(res);
        break;
    case 'start':
        status = counterStart();
        break;
    case 'stop':
        status = counterStop();
        break;
    case 'reset':
        status = counterReset();
        break;
    default:
        status = "invalid request";
        break;
    case 'status':
        // this will return the assigned status
        break;
    }

    if (io) {
        console.log("emitting socket status", status);
        io?.emit("socket.status", { 
            status: status,
        });
    }

    res.status(200).json({ 
        status: status,
        count: count  
    })
};

export default handler;
