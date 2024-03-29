/* Components */
import { Providers } from "@/lib/redux/providers";
import NavMenu from '@components/Navmenu/NavMenu';
import NProgress from "./nprogress";

import 'dotenv/config';

import styles from "@styles/layout.module.css";
import "@styles/globals.scss";
import { Suspense } from "react";
import { Header } from "./Header";
import { Metadata } from "next";

interface FooterLinkProps {
  url: string;
  label: string;
}

const env = process.env.NODE_ENV === "development" ? "dev" : "prod";
const BASE_SERVER_URL = `https://next${env}.syntapse.co.uk`;

export const metadata: Metadata = {
  title: 'Syntapse Ltd',
  description: 'Syntapse Next14 Redux Playground',
  openGraph: {
    type: "website",
    url: BASE_SERVER_URL,
    title: "Syntapse",
    description: 'Syntapse Next14 Redux Playground',
    siteName: BASE_SERVER_URL,
    images: [{
      url: `${BASE_SERVER_URL}/syntapse-logo-2.png`,
    }],

  }
};

const FooterLink: React.FC<FooterLinkProps> = ({ url, label }) => {
  return <span>
    <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">{label}</a>
  </span>
}

export default function RootLayout(props: React.PropsWithChildren) {
  let initialState;
  const message = "App state initialised on the server and loaded into redux state on all routes";

  if (process.env.NODE_ENV === "development") {
    initialState = "Dev build. " + message;
  } else if (process.env.NODE_ENV === "production") {
    initialState = "Prod build." + message;
  }
  return (
    <Providers initialState={initialState}>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <Suspense fallback="loading">
              <NavMenu />
            </Suspense>
            <Header />
            <NProgress />
            <main className={styles.main}>{props.children}</main>
            <footer className={styles.footer}>
              <span>Learn </span>
              <FooterLink url="https://reactjs.org/" label="React" />
              <FooterLink url="https://redux.js.org/" label="Redux" />
              <FooterLink url="https://redux-toolkit.js.org" label="Redux Toolkit" />
              <span>and</span>
              <FooterLink url="https://react-redux.js.org/" label="React Redux" />
            </footer>
          </section>
        </body>
      </html>
    </Providers>
  );
}
