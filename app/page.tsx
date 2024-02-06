/* Components */
import { Counter } from "./components/Counter/Counter";
import ReactMarkdown from 'react-markdown';

const markdownText = `
  # Introduction

  ## This code is modified to work with Next and Redux HMR. Without [redux mods](https://redux-toolkit.js.org/usage/nextjs) state will reset on every HMR code change

  This is a collection of experiments to understand and familiarise with the newest APIs for 
  Next JS and Redux Toolkit to serve as a stable, predictable foundation for building apps with 
  complex client state.

  This counter is the default reference example for RTK -  a simple counter including Thunks for 
  asynchronous operations. The /verify page will demonstrate that client state is persisted across 
  routes.

  This site also includes demos for Todo Lists using thunks, sagas and the new RTK createListenerMiddleWare
  API.

  All the code is available on github. Have a click around and enjoy!
  `;

export default function IndexPage() {
  return <>
    <div>
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
