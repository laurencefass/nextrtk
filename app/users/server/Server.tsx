import { Component } from './Component';

export function Server() {
    console.log("Server Component rendered")
    return <>
    <div className="bordered">
        <Component name="Nested Server Component"/>
    </div>
</>
}