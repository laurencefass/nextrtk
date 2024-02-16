'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getPaths } from '@utils/client'

export function Nav() {
    const router = useRouter();
    const pathname = usePathname();
    let slugs: Array<string> | undefined = undefined;
    slugs = pathname ? getPaths(pathname) : [];
    const links = ["Settings", "Configure", "Admin"];

    if (slugs?.length == 1)
        router.push(`/${slugs[0]}/${links[0].toLowerCase()}`)

    return (
        <>
            {/* <pre>{JSON.stringify(slugs, null, 2)}</pre> */}
            <nav className="page-tabs">
                {links.map((link, index) => {
                    if (slugs?.length) {
                        // Using optional chaining and nullish coalescing operator for safer access
                        const isActive = slugs[1]?.toLowerCase() === link.toLowerCase();
                        return (
                            <Link className={isActive ? "tab-active" : ""} key={index} href={`/${slugs[0] ?? ''}/${link.toLowerCase()}`}>
                                {link}
                            </Link>
                        );
                    }
                })}
            </nav>
        </>
    );
}