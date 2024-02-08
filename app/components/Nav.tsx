"use client";

/* Core */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Instruments */
import styles from "../styles/layout.module.css";

function Navlink({ href, label }: { href: string, label: string }) {
  const pathname = usePathname();

  return <Link
    style={{
      border: "2px solid gray",
      background: "lightgray",
      padding: "10px",
      fontSize: "20px"
    }}
    className={`${styles.link} ${pathname === "/" ? styles.active : ""}`} href={href} >
    {label}
  </Link>
}

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Navlink href='/' label='Home' />
      <Navlink href='/login' label='Login' />
      <Navlink href='/thunk/todo' label='Todo list' />
      <Navlink href='/socket' label='Socket demo' />
      <Navlink href='/users/client' label='Entity CRUD' />
      <Navlink href='/users/server' label='RSC CRUD' />
      <Navlink href='/library' label='Library CRUD' />
      <Navlink href='/verify' label='Verify state' />
      <Navlink href='/megamenu' label='Megamenu' />
    </nav>
  );
};
