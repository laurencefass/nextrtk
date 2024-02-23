/* Components */
import { Counter } from "@components/Counter/Counter";
import ReactMarkdown from 'react-markdown';

const markdownText = `
  # Introduction

  This is a collection of experiments to understand and familiarise with the newest APIs for 
  Next JS and Redux Toolkit to serve as a stable, predictable foundation for building highly scalable apps 
  with complex state models.

  The counter on this page is the default reference example for RTK -  a simple component including thunks for 
  asynchronous operations. The [verify](/verify) page will demonstrate that client state is persisted across 
  routes.

  This site also includes demos for Todo Lists using thunks, sagas and the new RTK createListenerMiddleWare
  API.

  #### This site is [modified to work with Next](https://redux-toolkit.js.org/usage/nextjs) and Redux HMR. Without recommended mods Redux state will reset on every HMR code change. Its also configured to initialise common app state on the server. 

  Naturally we'll start with a counter component. All the code is available on github. Have a click around and enjoy!
  `;

export default function IndexPage() {
  return <>
    <div className="content">
      <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
    </div>
    <div className="bordered">
      <Counter />
    </div>
  </>;
}

export const metadata = {
  title: "Redux Toolkit",
};
