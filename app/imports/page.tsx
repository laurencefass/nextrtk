import ReactMarkdown from "react-markdown";
import { ClientComponent } from "./client";

export const dynamic = "force-dynamic";

const text = `
# Import tests

All resources on this page are imported from [package-mono](https://github.com/laurencefass/package-mono). 
Docker bind mounting packages into the projects node_modules simplifies installation enables side-by-side 
live development of packages in a multi-bundler mono-repo and any number of consuming projects.

## Notes
- Individual packages are dynamically bind mounted directly into the app container removing need to re-install packages when they change.
- This enables live development and immediate updates whilst ensuring a clear boundary between services and consumers
- The bind mounts need to be disabled when installing new modules as they are locked in the container whilst mounted
- This is a much smaller overhead than maintaining imports. Stop the container, disable mounts, install, re-enable mounts
`;

export default function Home() {
    return (
        <main className="content">
            <ReactMarkdown>{text}</ReactMarkdown>
            <ClientComponent />
        </main>
    )
}
