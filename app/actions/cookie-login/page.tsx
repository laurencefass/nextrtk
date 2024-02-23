import { Accordion } from "@/lib/components/layout/Accordion/Accordion";
import ReactMarkdown from "react-markdown";
import LoginForm from "./form";

const markdownText = `
## A site wide login and registration form using server actions.

### Features
- Default users are for testing are 123/123 (admin) and 456/456 (authenticated)
- New users can be registered and login/out but will reset to defaults on page load
- Basic auth validation checks for duplicate users and password mismatches
- The check button will check for authorisation and return a message
- The test link will load another page that conditionally renders anonymous and authenticated content


### Cookie notes  
- Cookies are same site and http only to reduce chance of XSS attack.
- Cookies by their nature will persist across windows, tabs and sessions.
- A unique encypted session token is issued to each unique login and removed/renewed on logout
- There is no expiry on the session cookie so will persist until manually removed or the user logs out.
`;

export const dynamic = "force-dynamic";

export default function Page() {
    return <>
        <Accordion title="Server Action based login and authentication">
            <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
        </Accordion>
        <LoginForm />
    </>
}