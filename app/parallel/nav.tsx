import Link from 'next/link'
import "@styles/globals.css"

export function Nav() {
    return <>
        <div className="parallel-nav">
            <div>
                <Link href="/parallel"><h2>Reset route</h2></Link>
            </div>
            <div>
                <h2>Soft (Next) Links</h2>
                <Link href="/parallel/settings">Settings</Link>
                <Link href="/parallel/configure">Configure</Link>
                <Link href="/parallel/account">Account</Link>
            </div>
            <div>
                <h2>Hard (anchor) Links</h2>
                <a href="/parallel/settings">Settings</a>
                <a href="/parallel/configure">Configure</a>
                <a href="/parallel/account">Account</a>
            </div>
        </div>
    </>
}