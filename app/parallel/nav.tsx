import Link from 'next/link'
import "@styles/globals.scss"
import "./styles.css";

export function Nav() {
    return <>
        <div className="parallel-nav">
            <div className="bordered">
                <Link href="/parallel"><h3>Reset route</h3></Link>
            </div>
            <div className="bordered">
                <h3>Soft (Next) Links</h3>
                <Link href="/parallel/settings">Settings</Link>
                <Link href="/parallel/configure">Configure</Link>
                <Link href="/parallel/account">Account</Link>
            </div>
            <div className="bordered">
                <h3>Hard (anchor) Links</h3>
                <a href="/parallel/settings">Settings</a>
                <a href="/parallel/configure">Configure</a>
                <a href="/parallel/account">Account</a>
            </div>
        </div>
    </>
}