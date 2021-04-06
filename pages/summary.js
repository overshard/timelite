import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

import Page from "../components/page";
import { Context } from "../components/context";

const Summary = () => {
  const { state, dispatch } = useContext(Context);
  const canvasRef = useRef(null);

  // strings.setLanguage(state.language);

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
    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: getLabels(state.log),
        datasets: [
          {
            label: "# of Hours",
            data: getDatasets(state.log),
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    chart.canvas.parentNode.style.height = "400px";

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Page title="Summary">
      <Grid>
        <Main>
          <Title>Summary</Title>
          <p>Total number of hours spent across all tags.</p>
          <TotalTime>{getTotalTime(state.log)} hours</TotalTime>
          <p>The number of hours you've spent per-tag.</p>
          <CanvasWrapper>
            <canvas ref={canvasRef} />
          </CanvasWrapper>
        </Main>
      </Grid>
    </Page>
  );
};

export default Summary;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr 20%;
  width: 100%;
  height: 100vh;
`;

const Main = styled.main`
  grid-area: 1/2;
`;

const Title = styled.h1`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 6em;
  margin-bottom: 2rem;
`;

const CanvasWrapper = styled.div`
  background-color: white;
  padding: 0.25rem;
`;

const TotalTime = styled.div`
  font-size: 4em;
  font-weight: 900;
  margin-bottom: 3rem;
`;
