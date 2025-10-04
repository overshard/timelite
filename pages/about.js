import React, { useContext } from "react";

import Page from "../components/page";
import { Context } from "../components/context";
import strings from "../l10n/about";

import styles from "./about.module.css";

const About = () => {
  const { state } = useContext(Context);
  strings.setLanguage(state.language);

  return (
    <Page title="About">
      <a
        className={styles.githubLink}
        href="https://github.com/overshard/timelite"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <div className={styles.githubLogo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </div>
      </a>
      <div className={styles.grid}>
        <main className={styles.main}>
          <h1 className={styles.heading}>{strings.title}</h1>
          <blockquote className={styles.blockquote}>{strings.quote}</blockquote>
          <a
            className={styles.creator}
            href="https://www.isaacbythewood.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {strings.name}
          </a>
          <div className={styles.descriptionContainer}>
            <div className={styles.keysColumn}>
              <h2 className={styles.sectionTitle}>{strings.sectionTimer}</h2>
              <div className={styles.keysDescription}>
                <span>⎇+r</span> {strings.keyReset}
              </div>
              <div className={styles.keysDescription}>
                <span>⎇+a</span> {strings.keyAddLog}
              </div>
              <h2 className={styles.sectionTitle}>{strings.sectionNavigation}</h2>
              <div className={styles.keysDescription}>
                <span>⎇+t</span> {strings.keyTimerPage}
              </div>
              <div className={styles.keysDescription}>
                <span>⎇+l</span> {strings.keyLogPage}
              </div>
              <div className={styles.keysDescription}>
                <span>⎇+o</span> {strings.keyAboutPage}
              </div>
            </div>
            <div className={styles.keysColumn}>
              <h2 className={styles.sectionTitle}>{strings.sectionLog}</h2>
              <div className={styles.keysDescription}>
                <span>↓</span> {strings.keyNextLogEntry}
              </div>
              <div className={styles.keysDescription}>
                <span>↑</span> {strings.keyPreviousLogEntry}
              </div>
              <div className={styles.keysDescription}>
                <span>⎇+e</span> {strings.keyEditEntry}
              </div>
              <div className={styles.keysDescription}>
                <span>⎇+d</span> {strings.keyDeleteSingleEntry}
              </div>
              <div className={styles.keysDescription}>
                <span>⎇+c</span> {strings.keyClearLog}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Page>
  );
};

export default About;
