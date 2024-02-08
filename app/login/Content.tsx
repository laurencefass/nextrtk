'use client'

import { useSelector } from 'react-redux';
import { selectSession } from '@slices/sessionSlice';

export function CustomTabTitle() {
    return <div>💩 Content</div>
}

export function CustomTabContent() {
    const session = useSelector(selectSession);

    if (session.status === 'logged in') return <>
        <h1>Authorised Content</h1>
        <p>User is logged in so can access authorised content</p>
        <pre>
            {JSON.stringify(session, null, 2)}
        </pre>
    </>
    return <>
        <h1>Anonymous Content</h1>
        <p>User is not logged in so cannot see authorised content</p>
        <pre>
            {JSON.stringify(session, null, 2)}
        </pre>
    </>
}
