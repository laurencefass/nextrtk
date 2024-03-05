/* Components */
import { Counter } from "@components/Counter/Counter";
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'

const intro = `
This is a collection of pages and components constructed to understand and familiarise with the newest APIs for 
React, Next JS and Redux Toolkit to serve as a stable, predictable foundation for building highly scalable apps 
with complex state model requirements. Top level pages are delivered as React Server Components and data is fetched 
directly from endpoints and server actions providing a very secure, robust, typesafe, server based data access layer.
`

const notes = `
  ### Notes 
  
  - This site is [modified to work with Next](https://redux-toolkit.js.org/usage/nextjs) and Redux HMR. Without recommended mods Redux state will reset on every HMR code change. Its also configured to initialise common app state on the server. 
  - It is responsive so all pages and components will adjust to desktop, tablet and mobile views
  - It includes demos for Todo Lists using thunks, sagas and the new RTK createListenerMiddleWare
  API.
  - It includes demos for secure encrypted authentication using cookies and jwts, using both actions and endpoints.
  - It includes some of the newest Next API features including parallel and intercepted routes and tests for cacheing pages and endpoints
  - Where layout components have been used these have been designed and coded using as few dependencies as possible to fully explore the new React APIs e.g. the tabbed container has an option to incorporate useTransitiions.
  ***
  Naturally we'll start with a counter component. All the code is available on github.   The counter on this page is the default reference example for RTK -  a simple component including thunks for 
  asynchronous operations. The [verify](/verify) page will demonstrate that client state is persisted across 
  routes. Have a click around and enjoy!
  `;

export default function IndexPage() {
  return <>
    <div className="content">
      <h2>Syntapse Next14 Monorepo Playground</h2>
      <ReactMarkdown>{intro}</ReactMarkdown>
      <img src="/syntapse-icons.png" alt="title picture" />
      <ReactMarkdown>{notes}</ReactMarkdown>
    </div>
    <div className="bordered">
      <Counter />
    </div>
  </>;
}

export const metadata = {
  title: "Redux Toolkit",
};
