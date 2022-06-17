import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

import Page from "../components/page";
import { Context } from "../components/context";
import strings from "../l10n/summary";

const Summary = () => {
  const { state, dispatch } = useContext(Context);
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
      <Grid>
        <Main className={state.log.length <= 0 ? "empty" : ""} tabIndex="1">
          {state.log.length > 0 ? (
            <>
              <Title>{strings.title}</Title>
              <p>{strings.totalHours}</p>
              <TotalTime>{strings.varHours(getTotalTime(state.log))}</TotalTime>
              <p>{strings.tagHours}</p>
              <CanvasWrapper>
                <canvas ref={canvasRef} />
              </CanvasWrapper>
            </>
          ) : (
            <Nothing>{strings.logEmpty}</Nothing>
          )}
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

  &.empty {
    grid-area: 1/2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
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
  margin-bottom: 2rem;
`;

const TotalTime = styled.div`
  font-size: 4em;
  font-weight: 900;
  margin-bottom: 3rem;
`;

const Nothing = styled.div`
  font-weight: 100;
  font-size: 2.5em;
  text-align: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -15px;
    height: 3px;
    background-color: ${(props) => props.theme.colors.three};
  }

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 1.4em;
  }
`;
