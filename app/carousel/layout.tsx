import { Suspense } from "react";

export default function Layout(props: React.PropsWithChildren) {
  return <>
    <Suspense fallback="loading...">
      {props.children}
    </Suspense>
  </>
}
