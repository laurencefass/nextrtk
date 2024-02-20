'use client'

import { selectAppMessage } from "@/lib/redux";
import { useSelector } from "react-redux";

export function AppStateSubscriber() {
    const message = useSelector(selectAppMessage);
    if (!message)
        return null;
    return <>
        <h3 style={{ marginLeft: "10px" }}>{message}</h3>
    </>
}