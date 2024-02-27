import { Accordion } from "@components/layout/Accordion/Accordion";
import ReactMarkdown from "react-markdown";

const markdownText = `
## Maplio is a proof of concept platform for enabling multi-user realtime location based activities. It uses socket.io to tracks multiple users in realtime using session based boundaries.

### _If "pacman in the park" and "IRL zombie survival" sound like potentially fun activities for your mobile platform please have a quick read through the investment deck..._

## Motivation
- Maplio is intended to be a real-time location based social network allowing users and players to interact with each-other and explore fixed and mobile digital objects in their immediate location.
- The vision for Maplio was conceived during the first UK lockdown of 2020 as a mobile version of multiplayer games such as Roblox or Minecraft that could allow younger players to take their gaming outdoors and connect in parks and other open spaces to play games and engage with other augmented reality content.
- It is a Javascript (not Typescript) project in its current form though provides the basis for examining a number of interesting features

## Proof of concept
A working proof of concept is available at [here](https://app.maplio.co.uk). This started as an aid to learning realtime React and sockets and is (i) not production code, (ii) not typesafe, (iii) using props injection for shared component state. For these reasons it is useful as it is but will not be developed further.

## Prototype
The next stage of development will be to develop a prototype using Next 14+ and Redux. The Javascipt POC slows down significantly when there are a large amount of artefacts on screen and this is almost certainly due to inherent inefficiencies sharing state via props injection.

## The future
- Montezing location data for fun and profit
- Generating play-zones in real areas for general use.
- Partnering with business and sponsors to incentivize completion of map based activities.
- Integrating with existing map based APIs e.g. route planners

`

export default function Deck() {
    return <div className="content wide">
        <Accordion open={false} title="Maplio (click to read more)">
            <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
        </Accordion>
        <a href="/deck.pdf" download><button>Download this file</button></a>
        <iframe style={{ width: "100%", height: "100vh" }} src="/deck.pdf" />
    </div>
}