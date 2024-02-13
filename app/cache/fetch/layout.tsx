import { Suspense } from "react"

export default function Layout(props: React.PropsWithChildren) {
  return <>

    <Suspense fallback={<h1>Loading...</h1>}>
      {props.children}
    </Suspense>
  </>
}
