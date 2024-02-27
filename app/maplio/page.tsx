import { Accordion } from "@components/layout/Accordion/Accordion";
import ReactMarkdown from "react-markdown";

const markdownText = `
Maplio is a proof of concept platform for enabling multi-user realtime location based activities. It uses socket.io to tracks multiple users in realtime using session based boundaries.

### Origins
Maplio is intended to be a real-time location based social network allowing users and players to interact with each-other and explore fixed and mobile digital objects in their immediate location.
The vision for Maplio was conceived during the first UK lockdown of 2020 as a mobile version of multiplayer games such as Roblox or Minecraft that could allow younger players to take their gaming outdoors and connect in parks and other open spaces to play games and engage with other augmented reality content.

## Proof of concept
A proof of concept is available at [app.maplio](https://app.maplio.co.uk). This was developed as an aid to learning realtime React and is (i) not production code, (ii) not typesafe, (iii) using props injection for shared component state. For these reasons it is useful as it is but will not be developed further.

## Prototype
The next stage of development will be to develop a prototype using Next 14+ and Redux. The Javascipt POC slows down significantly when there are a large amount of artefacts on screen and this is almost certainly due to inherent inefficiencies sharing state via props injection.

If "pacman in the park" and "IRL zombie survival" sound like potentially fun activities for your mobile platform please have a quick read through the investment deck...
`

export default function Deck() {
    return <div className="content">
        <Accordion open={false} title="Maplio (click to read more)">
            <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
        </Accordion>
        <h2>Proof of concept for a hybrid geoaware mobile activity platform combining elements of Google navigator, Pokemon Go, Uber, and Whatsapp</h2>
        <a href="/deck.pdf" download><button>Download this file</button></a>
        <iframe style={{ height: "100vh" }} src="/deck.pdf" />
    </div>
}