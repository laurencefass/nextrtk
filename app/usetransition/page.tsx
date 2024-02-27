import { AccordionContainer, AccordionSection } from "@components/layout/Accordion/Accordion";
import TransitionTabs from "./TransitionTabs";
import ReactMarkdown from "react-markdown";

const text = `
# useTransition
A full explanation is available [here](https://react.dev/reference/react/useTransition)
- useTransition is a React Hook that lets you update the state without blocking the UI.
- There are two examples here - tab control state updates with without transitions.
- Tab with transitions don't block tab traversal during slow page loads
- Tab traversals are also interruptable as the UI is not locked by state updates.
`
export default function Page() {
    return <div className="content">
        <ReactMarkdown>{text}</ReactMarkdown>
        <AccordionContainer>
            <AccordionSection title="tabs with useTransition">
                <TransitionTabs useTransitions={true} />
            </AccordionSection>
            <AccordionSection title="tabs without useTransitions">
                <TransitionTabs useTransitions={false} />
            </AccordionSection>
        </AccordionContainer>
    </div>
}