import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

import Page from "../components/page";
import strings from "../l10n/log";

const Log = props => {
  strings.setLanguage(props.language);

  const [firstEntryDate, setFirstEntryDate] = useState(null);

  useEffect(() => {
    if (props.timeLogs.length > 0)
      setFirstEntryDate(
        new Date(props.timeLogs[props.timeLogs.length - 1].start)
      );
    else setFirstEntryDate(null);
  }, [props.timeLogs]);

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
        <TopBar>
          <Heading>{strings.log}</Heading>
          {firstEntryDate && (
            <Start>
              <span>{strings.start}</span>
              {firstEntryDate.toLocaleTimeString()}
            </Start>
          )}
          {props.timeLogs.length > 0 && (
            <Total>
              <span>{strings.total}</span>
              {getTotalTime()}
            </Total>
          )}
        </TopBar>
        {props.timeLogs.length > 0 ? (
          <>
            <TransitionGroup component={null}>
              {props.timeLogs.map((log, index) => {
                const timeout = (index + 1) * 250;
                const transitionDelay = index * 125;
                return (
                  <CSSTransition
                    key={log.id}
                    appear
                    timeout={{ appear: timeout, enter: 250, exit: 250 }}
                    classNames="fade"
                  >
                    <Entry style={{ transitionDelay: `${transitionDelay}ms` }}>
                      <EntryTime>{log.time}</EntryTime>
                      <EntryNote>{log.note}</EntryNote>
                      <EntryRemove
                        onClick={() => {
                          props.removeTimeLog(log.id);
                        }}
                      >
                        x
                      </EntryRemove>
                    </Entry>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            <BottomBar>
              <Reset onClick={props.resetTimeLog}>{strings.clear}</Reset>
            </BottomBar>
          </>
        ) : (
          <Nothing>{strings.nothing}</Nothing>
        )}
      </Main>
    </Page>
  );
};

Log.propTypes = {
  timeLogs: PropTypes.array,
  removeTimeLog: PropTypes.func,
  resetTimeLog: PropTypes.func,
  language: PropTypes.string
};

export default Log;

const Main = styled.main`
  grid-area: main;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  display: flex;
  margin-bottom: 40px;
  justify-content: space-between;
  align-items: flex-end;
`;

const Heading = styled.h1`
  font-size: 5em;
  font-weight: lighter;
  margin-top: 0;
  margin-bottom: 0;
  &::before {
    content: "";
    width: 50px;
    height: 5px;
    background-color: blue;
    display: block;
  }
  @media (${props => props.theme.breakpoint}) {
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

  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    transform: translateX(-100px);
  }
  &.fade-appear-active,
  &.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition-duration: 250ms;
    transition-property: opacity, transform;
  }
  &.fade-exit {
    opacity: 1;
    transform: translateX(0);
  }
  &.fade-exit-active {
    opacity: 0;
    transition-delay: 0ms !important;
    transition-duration: 250ms;
    transition-property: opacity, transform;
    transform: translateX(100px);
  }

  @media (${props => props.theme.breakpoint}) {
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
  box-sizing: border-box;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
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
  @media (${props => props.theme.breakpoint}) {
    padding: 5px;
  }
`;

const Nothing = styled.div`
  text-align: center;
  margin-top: 100px;
  opacity: 0.5;
  font-size: 2em;
  @media (${props => props.theme.breakpoint}) {
    font-size: 1.4em;
  }
`;

const Total = styled.div`
  font-weight: bolder;
  font-size: 2em;
  padding: 5px;
  & span {
    font-size: 0.4em;
    text-transform: uppercase;
    font-weight: lighter;
    display: block;
  }
`;

const Start = styled(Total)`
  @media (${props => props.theme.breakpoint}) {
    display: none;
  }
`;

const BottomBar = styled.div`
  text-align: right;
`;

const Reset = styled.button`
  font-size: 1.2em;
  border: 0;
  border-radius: 3px;
  background-color: #ff0000;
  padding: 10px 25px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 30px;
  color: white;
  font-weight: bolder;
  cursor: pointer;
  @media (${props => props.theme.breakpoint}) {
    font-size: 1em;
    padding: 8px 15px;
  }
`;
