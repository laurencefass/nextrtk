'use client'

import { useState } from "react";
import { action, mockFetchData } from "./actions";

export default function Client() {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        let data = await mockFetchData()
        setData(data);
        setLoading(false);
    }

    return <div className="bordered spaced">
        <div>This component will fetch data directly from a server action with no fetch. This has major implicatons for type safety and maintainability across machine boundaries</div>
        <button onClick={handleClick}>Click me</button>
        <div>{loading ? "loading" : ""}</div>
        <div>{data && !loading && <div>fetch returned: {JSON.stringify(data)}</div>}</div>
    </div>
}