import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import uuid from "uuid";

import strings from "../l10n/timer";

const Timer = props => {
  strings.setLanguage(props.language);

  const [time, setTime] = useState("00:00:00");
  const [note, setNote] = useState("");

  useEffect(() => {
    // NOTE: Run this immediately to improve moving between pages
    setTime(getTimeCurrent());

    const timerInterval = setInterval(() => {
      const timeCurrent = getTimeCurrent();
      setTime(timeCurrent);
      document.title = `${timeCurrent} — Timelite`;
    }, 1000);

    const cleanup = () => {
      clearInterval(timerInterval);
    };

    return cleanup;
  }, [props.time]);

  const getTimeCurrent = () => {
    if (props.time === null) return "00:00:00";
    const timerCurrent = new Date();
    const timerMiliseconds = timerCurrent - props.time;
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

  const resetTime = () => {
    // NOTE: This also resets the display to make the app feel more responsive
    props.resetTime();
    setTime("00:00:00");
    setNote("");
  };

  const addTimeLog = () => {
    const id = uuid();
    const start = props.time;
    const end = new Date();
    const diff = end - start;
    props.addTimeLog({
      id: id,
      start: start.toString(),
      end: end.toString(),
      diff: diff,
      time: getTimeCurrent(),
      note: note
    });
    resetTime();
  };

  const onChangeNote = e => {
    setNote(e.target.value);
  };

  const submitForm = e => {
    e.preventDefault();
    addTimeLog();
  };

  return (
    <>
      <Time>{time}</Time>
      <form onSubmit={submitForm}>
        <Inputs>
          <Note
            type="text"
            aria-label={strings.note}
            placeholder={strings.note}
            value={note}
            onChange={onChangeNote}
          />
        </Inputs>
        <Buttons>
          <ResetButton
            className="timer__button"
            type="reset"
            onClick={resetTime}
          >
            - {strings.reset}
          </ResetButton>
          <AddButton className="timer__button" type="submit">
            {strings.add} +
          </AddButton>
        </Buttons>
      </form>
    </>
  );
};

Timer.propTypes = {
  time: PropTypes.object,
  resetTime: PropTypes.func,
  addTimeLog: PropTypes.func,
  language: PropTypes.string
};

export default Timer;

const Time = styled.div`
  font-size: 12em;
  text-align: center;
  font-weight: lighter;
  @media (${props => props.theme.breakpoint}) {
    font-size: 4em;
  }
`;

const Inputs = styled.div`
  text-align: center;
`;

const Note = styled.input`
  width: 600px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  border: 0;
  background: white;
  color: black;
  padding: 15px 30px;
  font-size: 1.6em;
  box-shadow: 1px 1px 0px white;
  transform: scale(1);
  transition: transform 250ms;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
  &::placeholder {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8em;
  }
  @media (${props => props.theme.breakpoint}) {
    padding: 5px 15px;
    font-size: 1.2em;
    width: 225px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const Buttons = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  border: 0;
  color: white;
  padding: 15px 30px;
  font-size: 1em;
  letter-spacing: 4px;
  width: 40%;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: lighter;
  transform: scale(1);
  transition: transform 250ms;
  border-radius: 3px;
  margin: 0 10px;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
  @media (${props => props.theme.breakpoint}) {
    font-size: 0.9em;
    padding: 5px 10px;
    width: 50%;
    margin: 0 5px;
  }
`;

const ResetButton = styled(Button)`
  background: #790000;
`;

const AddButton = styled(Button)`
  background: #007900;
`;
