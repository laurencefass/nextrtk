'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getPaths } from '@utils/client'

export function PageTabs({ tabs }: { tabs: Array<string> }) {
    const router = useRouter();
    const pathname = usePathname();
    let slugs: Array<string> | undefined = undefined;
    slugs = pathname ? getPaths(pathname) : [];

    if (slugs?.length == 1)
        router.push(`/${slugs[0]}/${tabs[0].toLowerCase()}`)

    return (
        <>
            {/* <pre>{JSON.stringify(slugs, null, 2)}</pre> */}
            <nav className="page-tabs">
                {tabs.map((tab, index) => {
                    if (slugs?.length) {
                        // Using optional chaining and nullish coalescing operator for safer access
                        const isActive = slugs[1]?.toLowerCase() === tab.toLowerCase();
                        return (
                            <Link className={isActive ? "tab-active" : ""} key={index} href={`/${slugs[0] ?? ''}/${tab.toLowerCase()}`}>
                                {tab}
                            </Link>
                        );
                    }
                })}
            </nav>
        </>
    );
}