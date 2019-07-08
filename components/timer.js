import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Timer = props => {
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
    const start = props.time;
    const end = new Date();
    const diff = end - start;
    props.addTimeLog({
      start: start,
      end: end,
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
            placeholder="Note"
            value={note}
            onChange={onChangeNote}
          />
        </Inputs>
        <Buttons>
          <Button className="timer__button" type="reset" onClick={resetTime}>
            - Reset
          </Button>
          <Button className="timer__button" type="submit">
            Add +
          </Button>
        </Buttons>
      </form>
    </>
  );
};

Timer.propTypes = {
  time: PropTypes.object,
  resetTime: PropTypes.func,
  addTimeLog: PropTypes.func
};

export default Timer;

const Time = styled.div`
  font-size: 10em;
  text-align: center;
  font-weight: lighter;
  @media (max-width: 1023.99px) {
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
  @media (max-width: 1023.99px) {
    padding: 5px 15px;
    font-size: 1.2em;
  }
`;

const Buttons = styled.div`
  text-align: center;
`;

const Button = styled.button`
  margin: 0 20px;
  border: 0;
  color: white;
  background: #73724c;
  padding: 15px 30px;
  font-size: 1em;
  letter-spacing: 4px;
  width: 280px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: lighter;
  transform: scale(1);
  transition: transform 250ms;
  border-radius: 3px;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
  @media (max-width: 1023.99px) {
    font-size: 0.9em;
    padding: 5px 10px;
    width: 100px;
    margin: 0 5px;
  }
`;
