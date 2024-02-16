/* Components */
import { Providers } from "@/lib/redux/providers";
import Megamenu from '@components/Megamenu/Megamenu';

import 'dotenv/config';

/* Instruments */
import styles from "@styles/layout.module.css";
import "@styles/globals.css";
import NProgress from "./nprogress";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <Megamenu />
            <header className={styles.header}>
              <img src="/syntapse-logo-2.png" className={styles.logo} alt="logo" />
              <h4>View the code on <a target="_blank" rel="noopener noreferrer" href="https://github.com/laurencefass/nextrtk/blob/main/README.md">github</a></h4>
            </header>
            <NProgress />
            <main className={styles.main}>{props.children}</main>
            <footer className={styles.footer}>
              <span>Learn </span>
              <a
                className={styles.link}
                href="https://reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              <span>, </span>
              <a
                className={styles.link}
                href="https://redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux
              </a>
              <span>, </span>
              <a
                className={styles.link}
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux Toolkit
              </a>
              ,<span> and </span>
              <a
                className={styles.link}
                href="https://react-redux.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Redux
              </a>
            </footer>
          </section>
        </body>
      </html>
    </Providers>
  );
}
