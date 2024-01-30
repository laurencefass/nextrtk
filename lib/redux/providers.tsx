"use client";

/* Core */
import { useRef } from 'react'
import { Provider } from "react-redux";

/* Instruments */
// import { reduxStore } from "@/lib/redux";
import { makeStore, ReduxStore } from "@/lib/redux";

export const Providers = (props: React.PropsWithChildren) => {
  //switching to makeStore appears to overcome the problem
  // of resetting state on each HMR code change  
  const storeRef = useRef<ReduxStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  // return <Provider store={reduxStore}>{props.children}</Provider>;
  return <Provider store={storeRef.current}>{props.children}</Provider>;
};
