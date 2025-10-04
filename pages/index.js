import React from "react";

import Page from "../components/page";
import Timer from "../components/timer";

import styles from "./index.module.css";

const Index = () => {
  return (
    <Page title="Timer">
      <div className={styles.background} />
      <div className={styles.grid}>
        <main className={styles.main}>
          <Timer />
        </main>
      </div>
    </Page>
  );
};

export default Index;
