import { Suspense } from "react";

export default function Layout(props: React.PropsWithChildren) {
  return <>
    <Suspense fallback="Loading...">
      {props.children}
    </Suspense>
  </>
}
