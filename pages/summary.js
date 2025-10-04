import React, { useEffect, useRef, useContext } from "react";
import Chart from "chart.js/auto";

import Page from "../components/page";
import { Context } from "../components/context";
import strings from "../l10n/summary";

import styles from "./summary.module.css";

const Summary = () => {
  const { state } = useContext(Context);
  strings.setLanguage(state.language);
  const canvasRef = useRef(null);

  const getLabels = (entries) => {
    let tags = [];
    entries.map((entry) => tags.push(...entry.tags));
    return [...new Set(tags)];
  };

  const getDatasets = (entries) => {
    const labels = getLabels(entries);
    let datasets = [];
    labels.map((label) => {
      const labeledEntries = [
        ...entries.filter((entry) => entry.tags.includes(label)),
      ];
      let totalTime = 0;
      labeledEntries.map((entry) => {
        totalTime += entry.end - entry.start;
      });
      datasets.push(totalTime / 1000 / 60 / 60);
    });
    return datasets;
  };

  const getTotalTime = (entries) => {
    let totalTime = 0;
    entries.map((entry) => {
      totalTime += entry.end - entry.start;
    });
    totalTime = totalTime / 1000 / 60 / 60;
    return Math.round(totalTime * 100) / 100;
  };

  useEffect(() => {
    if (state.log.length <= 0) return;

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: getLabels(state.log),
        datasets: [
          {
            label: strings.numHours,
            data: getDatasets(state.log),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
            ],
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [state.language]);

  return (
    <Page title="Summary">
      <div className={styles.grid}>
        <main
          className={`${styles.main} ${
            state.log.length <= 0 ? styles.mainEmpty : ""
          }`.trim()}
          tabIndex="1"
        >
          {state.log.length > 0 ? (
            <>
              <h1 className={styles.title}>{strings.title}</h1>
              <p>{strings.totalHours}</p>
              <div className={styles.totalTime}>
                {strings.varHours(getTotalTime(state.log))}
              </div>
              <p>{strings.tagHours}</p>
              <div className={styles.canvasWrapper}>
                <canvas ref={canvasRef} />
              </div>
            </>
          ) : (
            <div className={styles.nothing}>{strings.logEmpty}</div>
          )}
        </main>
      </div>
    </Page>
  );
};

export default Summary;
