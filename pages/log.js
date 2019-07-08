import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

import Page from "../components/page";

const Log = props => {
  const getTotalTime = () => {
    let timerMiliseconds = props.timeLogs.reduce((total, entry) => {
      return total + entry.diff;
    }, 0);
    const timerTotal = [
      (timerMiliseconds / 1000 / 60 / 60) % 60, // Hours
      (timerMiliseconds / 1000 / 60) % 60, // Minutes
      (timerMiliseconds / 1000) % 60 // Seconds
    ];
    return timerTotal
      .map(timer => {
        let stringTime = Math.floor(timer).toString();
        if (stringTime.length < 2) stringTime = `0${stringTime}`;
        return stringTime;
      })
      .join(":");
  };

  return (
    <Page title="Log">
      <Main>
        <Heading>Log</Heading>
        {props.timeLogs.length > 0 ? (
          <>
            <TransitionGroup component={null}>
              {props.timeLogs.map((log, index) => {
                const timeout = (index + 1) * 250;
                const transitionDelay = index * 125;
                return (
                  <CSSTransition
                    key={index}
                    appear
                    unmountOnExit
                    mountOnEnter
                    timeout={timeout}
                    classNames="fade"
                  >
                    <Entry style={{ transitionDelay: `${transitionDelay}ms` }}>
                      <EntryTime>{log.time}</EntryTime>
                      <EntryNote>{log.note}</EntryNote>
                      <EntryRemove
                        onClick={() => {
                          props.removeTimeLog(index);
                        }}
                      >
                        x
                      </EntryRemove>
                    </Entry>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            <Total>
              <span>Total</span>
              {getTotalTime()}
            </Total>
          </>
        ) : (
          <Nothing>No times added to your log yet!</Nothing>
        )}
      </Main>
    </Page>
  );
};

Log.propTypes = {
  timeLogs: PropTypes.array,
  removeTimeLog: PropTypes.func
};

export default Log;

const Main = styled.main`
  grid-area: main;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Heading = styled.h1`
  font-size: 5em;
  font-weight: lighter;
  margin-top: 0;
  &::before {
    content: "";
    width: 50px;
    height: 5px;
    background-color: blue;
    display: block;
  }
  @media (max-width: 1023.99px) {
    font-size: 3em;
  }
`;

const Entry = styled.div`
  background-color: #ffffff;
  color: black;
  margin-bottom: 15px;
  border-radius: 3px;
  display: grid;
  grid-template-columns: 150px 1fr 50px;
  align-items: center;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;

  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    transform: translateY(100px);
  }
  &.fade-appear-active,
  &.fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition-duration: 250ms;
    transition-property: opacity, transform;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 250ms;
  }

  @media (max-width: 1023.99px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    text-align: center;
  }
`;

const EntryTime = styled.div`
  font-weight: bold;
  font-size: 1.3em;
  padding: 15px;
  height: 100%;
  background-color: #e2e2e2;
  text-align: center;
`;

const EntryNote = styled.div`
  padding: 15px;
`;

const EntryRemove = styled.button`
  font-size: 1.3em;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  border: 0;
  background: red;
  margin: 0;
  padding: 15px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  height: 100%;
  @media (max-width: 1023.99px) {
    padding: 5px;
  }
`;

const Nothing = styled.div`
  text-align: center;
  font-size: 2em;
  @media (max-width: 1023.99px) {
    font-size: 1.4em;
  }
`;

const Total = styled.div`
  font-weight: bolder;
  font-size: 2em;
  margin-top: 50px;
  padding: 5px;
  & span {
    font-size: 0.4em;
    text-transform: uppercase;
    font-weight: lighter;
    display: block;
  }
  @media (max-width: 1023.99px) {
    text-align: center;
  }
`;
