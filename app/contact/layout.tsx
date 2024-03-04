import { Suspense } from "react";

export default function Layout(props: React.PropsWithChildren) {
    return <>
        <div className="content">
            <Suspense fallback={<h2>Loading...</h2>}>
                {props.children}
            </Suspense>
        </div>
    </>
}
