import React from "react";
import ReactMarkdown from "react-markdown";

const text = `
# Realtime socket controller
- Turn the socket on
- Start the counter and observe count progression on any tab, window or device
- Stop the counter and observe countr tops on any tab, window or device
- This is a simple count subscriber. Socket.io provides a stable platform for realtime communications of any complexity
- I plan to integrate with Redux state updates to allow state updates to occur across window and machine boundaries
`
export default function RootLayout(props: React.PropsWithChildren) {
  return <>
    <ReactMarkdown>{text}</ReactMarkdown>
    {props.children}
  </>
}
