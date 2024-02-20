import { AccordionContainer, AccordionSection } from "@components/layout/Accordion/Accordion";

export default function Page() {
    return <>
        <h1>React accordion</h1>
        <h2>Extendable React component with no external libraries</h2>
        <h2>Accordion with single open section</h2>
        <AccordionContainer allowMultipleOpen={false}>
            <AccordionSection title="Section 1">
                <h3>Content for Section 1</h3>
                <img
                    src={`https://picsum.photos/seed/1/500/400`}
                    height={400}
                />
            </AccordionSection>
            <AccordionSection title="Section 2">
                <h3>Content for Section 2</h3>
                <img
                    src={`https://picsum.photos/seed/2/500/400`}
                    height={400}
                />
            </AccordionSection>
        </AccordionContainer>

        <h2>Accordion with multiple open sections</h2>
        <AccordionContainer allowMultipleOpen>
            <AccordionSection title="Section 1">
                <h3>Content for Section 1</h3>
                <img
                    src={`https://picsum.photos/seed/3/500/400`}
                    height={400}
                />
            </AccordionSection>
            <AccordionSection title="Section 2">
                <h3>Content for Section 2</h3>
                <img
                    src={`https://picsum.photos/seed/4/500/400`}
                    height={400}
                />
            </AccordionSection>
        </AccordionContainer>
    </>
}