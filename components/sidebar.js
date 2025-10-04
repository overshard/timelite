import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Context } from "./context";
import strings from "../l10n/sidebar";

import styles from "./sidebar.module.css";

const Sidebar = () => {
  const { state } = useContext(Context);
  strings.setLanguage(state.language);
  const router = useRouter();

  return (
    <aside className={styles.side}>
      <div className={styles.title}>{strings.name}</div>
      <div className={styles.pages}>
        <Link href="/" passHref legacyBehavior>
          <a
            className={`${styles.pageLink} ${router.pathname === "/" ? styles.pageLinkActive : ""}`.trim()}
            aria-label={strings.timer}
          >
            <TimerIcon />
          </a>
        </Link>
        <Link href="/log" passHref legacyBehavior>
          <a
            className={`${styles.pageLink} ${router.pathname === "/log" ? styles.pageLinkActive : ""}`.trim()}
            aria-label={strings.log}
          >
            <LogIcon />
          </a>
        </Link>
        <Link href="/summary" passHref legacyBehavior>
          <a
            className={`${styles.pageLink} ${router.pathname === "/summary" ? styles.pageLinkActive : ""}`.trim()}
            aria-label={strings.summary}
          >
            <SummaryIcon />
          </a>
        </Link>
      </div>
      <Link href="/about" passHref legacyBehavior>
        <a className={styles.about} aria-label={strings.about}>
          <HelpIcon />
        </a>
      </Link>
    </aside>
  );
};

export default Sidebar;


const HelpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
    </svg>
  );
};

const TimerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.07 1.01h-6v2h6v-2zm-4 13h2v-6h-2v6zm8.03-6.62l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.14 4.74 14.19 4 12.07 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.11-.74-4.06-1.97-5.61zm-7.03 12.62c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
    </svg>
  );
};

const LogIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
    </svg>
  );
};

const SummaryIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <g>
        <rect fill="none" height="24" width="24" />
        <g>
          <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" />
          <rect height="5" width="2" x="7" y="12" />
          <rect height="10" width="2" x="15" y="7" />
          <rect height="3" width="2" x="11" y="14" />
          <rect height="2" width="2" x="11" y="10" />
        </g>
      </g>
    </svg>
  );
};
