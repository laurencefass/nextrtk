"use client";

import {
  AccordionSection,
  AccordionContainer,
  TabContainer,
  Tab,
  Modal,
  useScreenWidth,
  useRouteChange,
  MyComponent as MyBabelComponent
} from "react-babel";
import {
  helloWorld
} from "esbuild-ts";
import {
  MyComponent as MyTypescriptComponent
} from "react-ts";
import {
  MyComponent as MyRollupComponent
} from "react-rollup";

import "./styles.css";

export function ClientComponent() {
  const width = useScreenWidth();
  useRouteChange(() => {
    console.log("route changed");
  })
  return (
    <div>
      <h1>React Component tests</h1>
      <MyBabelComponent />
      <MyTypescriptComponent />
      <MyRollupComponent />
      <h1>Function tests</h1>
      <h2>Functional package built with esbuild + ts, greeting: {helloWorld()}</h2>
      {width && <h2>imported hook (useScreenWidth): {width}</h2>}
      <h1>Imported reusable layout components</h1>
      <Modal>
        <h1>Modal content works!</h1>
      </Modal>
      <AccordionContainer>
        <AccordionSection title="one">
          <h1>one</h1>
        </AccordionSection>
        <AccordionSection title="two">
          <h1>two</h1>
        </AccordionSection>
        <AccordionSection title="three">
          <h1>three</h1>
        </AccordionSection>
      </AccordionContainer>
      <TabContainer>
        <Tab title="one">
          <h1>one</h1>
        </Tab>
        <Tab title="two">
          <h1>two</h1>
        </Tab>
        <Tab title="three">
          <h1>three</h1>
        </Tab>
      </TabContainer>
    </div>
  );
}
