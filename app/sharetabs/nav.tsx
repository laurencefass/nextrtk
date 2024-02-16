'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Nav() {
    const router = useRouter();
    const pathname = usePathname();

    return <>
        {pathname}
        <nav className="page-tabs">
            <Link href="/sharetabs/settings">Settings</Link>
            <Link href="/sharetabs/configure">Configure</Link>
            <Link href="/sharetabs/admin">admin</Link>
        </nav>
    </>
}