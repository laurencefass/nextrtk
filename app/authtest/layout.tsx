import { Suspense } from "react";

export default function Layout(props: React.PropsWithChildren) {
    return <>
        <h2>This page is used to test authentication and login status</h2>
        <Suspense fallback={<h1>Loading...</h1>}>
            {props.children}
        </Suspense>
    </>
}
