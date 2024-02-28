'use client'

import SecureLink from "@/lib/components/html";
import { usePathname } from "next/navigation";
import { AppStateSubscriber } from "./AppState";
import styles from "@styles/layout.module.css";
import Link from "next/link";


export const Header = () => {
    let pathname = usePathname();
    return <>
        <header className={styles.header}>
            <h4>View the code on <SecureLink href="https://github.com/laurencefass/nextrtk/blob/main/README.md">github</SecureLink> or contact <Link href={`/contact?from=${pathname}`}>Syntapse</Link></h4>
            <AppStateSubscriber />
        </header>
    </>
}