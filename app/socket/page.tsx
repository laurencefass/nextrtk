'use client';

import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_PATH = "/socketio";
const BASE_SERVER_URL = "https://nextrtk.syntapse.co.uk";

export default function SocketController() {
    const [count, setCount] = useState("loading...");
    const [status, setStatus] = useState("initialising...");
    const socket =  useRef<Socket | null>(null);

    const serverFetch = async (url:string) => {
        try {
            let response = await(fetch(url));
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            console.log("response from server", data);
            setStatus(data.status);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleButtonClick = async (url:string) => {
        await serverFetch(url);
    };

    const handleSocketPing = () => {
        if (socket.current) {
            socket.current.emit('socket.ping', {data: "ping"}, (response: any) => {
                console.log('Response from server:', response);
                setStatus(response.data);
            });    
        } else {
            setStatus("noop: socket not connected");
        }
    }

    useEffect(()=> {
        console.log("useEffect.status", status)
        switch(status) {
            case "counter started":
            case "socket on":
                if (!socket.current) {
                    socket.current = io(BASE_SERVER_URL, { path: SOCKET_PATH })

                    socket.current.on('socket.counter', (message:any) => {
                        console.log("socket.counter", message.value);
                        setCount(count => message.value);
                    });    
                    socket.current.on('socket.pong', (message:any) => {
                        console.log("socket.pong", message);
                        setStatus(status => message.data);
                    }); 
                    socket.current.on('socket.status', (message:any) => {
                        console.log("socket.status", message);
                        setTimeout(()=> {                        
                            setStatus(status => message.status);
                        }, 500)
                    });    
                }
                break;
            case "socket off":
                if (socket.current) {
                    socket.current.off('counter');
                    socket.current.disconnect();
                    socket.current = null;    
                }
                break;   
            default: break;
        }
    }, [status]);

    useEffect(() => {
        (async () => {
            let data = await serverFetch('api/socket/status');
        })();

        // Cleanup on unmount
        return () => {
            if (socket.current) {
                socket.current.off('counter');
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, []);

    return <>
        <div>
            <h1>Socket Controller</h1>
            <h1>counter: { count } </h1>
        </div>                
        <div>
            <button onClick={() => handleButtonClick('/api/socket/on')}>Socket On</button>
            <button onClick={() => handleButtonClick('/api/socket/off')}>Socket Off</button>
            <button onClick={() => handleButtonClick('/api/socket/start')}>Counter Start</button>
            <button onClick={() => handleButtonClick('/api/socket/stop')}>Counter Stop</button>
            <button onClick={() => handleButtonClick('/api/socket/reset')}>Counter Reset</button>
            <button onClick={() => handleSocketPing()}>Ping</button>
        </div>
        <h1>server status: {status}</h1>
    </>
};