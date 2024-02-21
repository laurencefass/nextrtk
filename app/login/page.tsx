import ReactMarkdown from 'react-markdown';
import Session from "./Session";

const markdownText = `
# RTK login

Login, Logout and Registration are easily controlled using powerful primitives for complex state transitions.

- RTK makes it easy to separate code for Redux state, state transitions (with actions) and UI. 
- Registration and authorised content states are both dependent on login status
- For comparison implementations are included for [Redux Sagas](https://github.com/laurencefass/nextrtk/blob/main/lib/redux/slices/sessionSlice/sessionSaga.ts) and [RTK listeners](https://github.com/laurencefass/nextrtk/blob/main/lib/redux/slices/sessionSlice/sessionListener.ts) 
`
export default function Page() {
  return <>
    <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
    <Session />
  </>
}