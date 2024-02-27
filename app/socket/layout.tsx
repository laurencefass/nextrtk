import React from "react";
import ReactMarkdown from "react-markdown";

const text = `
# Realtime socket controller
## Start, stop and reset a simple counter across machine boundaries with Next.js and socket.io

A simple demonstration of realtime behaviour using Next JS api with no external socket server.

- Turn the socket on before use. This feature allows sockets to be reset from the client.
- Start the counter and observe count progression on any tab, window or device.
- Stop the counter and observe countr stops on all connected devices.
- Reset the counter and observer the counter resets across all connected devices.
- Counter state updates are added to the redux store and will persist across routes.
- This is a simple count subscriber. Socket.io provides a stable platform for realtime communications of any complexity
`
export default function RootLayout(props: React.PropsWithChildren) {
  return <div className="content">
    <ReactMarkdown>{text}</ReactMarkdown>
    {props.children}
  </div>
}
