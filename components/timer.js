import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { Context } from "./context";
import strings from "../l10n/timer";
import { timeString, timeDiff } from "../utils/time";

const Timer = () => {
  const { state, dispatch } = useContext(Context);
  const [time, setTime] = useState(timeString(timeDiff(state.timer)));
  const [note, setNote] = useState("");

  strings.setLanguage(state.language);

  useEffect(() => {
    setTime(timeString(timeDiff(state.timer)));

    const timerInterval = setInterval(() => {
      const timeCurrent = timeString(timeDiff(state.timer));
      setTime(timeCurrent);
      document.title = `${timeCurrent} — Timelite`;
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [state.timer]);

  const submitForm = e => {
    e.preventDefault();
    dispatch({ type: "ADD_LOG", note: note });
    setNote("");
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
            onChange={e => setNote(e.target.value)}
          />
        </Inputs>
        <Buttons>
          <ResetButton
            className="timer__button"
            type="reset"
            onClick={() => dispatch({ type: "NEW_TIMER" })}
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
