import { Suspense } from "react";

export default function Layout(props: React.PropsWithChildren) {
    return <div className="content">
        <span>This site currently supports JWT and encrypted token authentcation! Clear cookies if not working as expected <a href="chrome://settings/content/all?searchSubpage=syntapse">chrome link</a></span>
        <br />
        {props.children}
    </div>
}
