import { Accordion } from "@/lib/components/layout/Accordion/Accordion";
import ReactMarkdown from "react-markdown";
import LoginForm from "./form";

const markdownText = `
### Features
- This is designed to work exactly as the (standard session token implementation)[/actions/login]
- The JWT is also stored in a cookie and has all the same security benefits however there is no server side token lookup
- The absence of a lookup and reliance on user retrieval makes this a more scalable solution than session tokens
`;

export const dynamic = "force-dynamic";

export default function Page() {
    return <>
        <Accordion title="Login and authentication with Javascript Web Tokens (JWT)">
            <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
        </Accordion>
        <LoginForm />
    </>
}