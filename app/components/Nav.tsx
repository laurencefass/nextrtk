"use client";

/* Core */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Instruments */
import styles from "../styles/layout.module.css";

function Navlink({ href, label }: { href:string, label: string}) {
  const pathname = usePathname();

  return <Link
    style = {{ 
      border: "2px solid gray",
      background: "lightgray",
      padding: "10px"
    }}
    className={`${styles.link} ${pathname === "/" ? styles.active : ""}`} href = { href } >
      { label }
  </Link>
}

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Navlink href ='/' label = 'Home'/>
      <Navlink href = '/todo' label = 'Todo list' />
      <Navlink href = '/socket' label = 'Socket demo' />
      <Navlink href = '/verify' label = 'Verify state' />
      {/* <Link
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        href="/"
      >
        Home
      </Link> */}
      {/* <Link
        className={`${styles.link} ${
          pathname === "/todo" ? styles.active : ""
        }`}
        href="/todo"
      >
        TodoList
      </Link> */}
      {/* <Link
        className={`${styles.link} ${
          pathname === "/verify" ? styles.active : ""
        }`}
        href="/verify"
      >
        Verify
      </Link> */}
    </nav>
  );
};
