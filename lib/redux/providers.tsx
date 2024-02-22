"use client";

/* Core */
import { useRef } from 'react'
import { Provider } from "react-redux";

// original: import { reduxStore } from "@/lib/redux";

import { makeStore, ReduxStore } from "@/lib/redux";
import { initialiseAppState } from './slices/appSlice/appSlice';

interface ProviderWithStateProps {
  children: React.ReactNode;
  initialState?: any;
}

export const Providers: React.FC<ProviderWithStateProps> = ({ children, initialState }) => {
  //switching to makeStore appears to overcome the problem
  // of resetting state on each HMR code change  
  const storeRef = useRef<ReduxStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (process.env.NODE_ENV === "production" && initialState) {
      storeRef.current.dispatch(initialiseAppState(initialState))
    }
  }

  // original: return <Provider store={reduxStore}>{props.children}</Provider>;

  return <Provider store={storeRef.current}>{children}</Provider>;
};
