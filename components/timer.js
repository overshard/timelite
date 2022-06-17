import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";

import { Context } from "./context";
import strings from "../l10n/timer";
import { timeString, timeDiff } from "../utils/time";

const Timer = () => {
  const { state, dispatch } = useContext(Context);
  const [time, setTime] = useState(timeString(timeDiff(state.timer)));
  const refToMain = useRef(null);

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

  useEffect(() => {
    refToMain.current.focus();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_LOG", note: state.note });
    dispatch({ type: "NOTE_UPDATED", note: "" });
  };

  return (
    <>
      <Time suppressHydrationWarning>{time}</Time>
      <form onSubmit={submitForm}>
        <Inputs>
          <Note
            type="text"
            aria-label={strings.note}
            placeholder={strings.note}
            value={state.note || ""}
            ref={refToMain}
            onChange={(e) =>
              dispatch({ type: "NOTE_UPDATED", note: e.target.value })
            }
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
  font-size: 10em;
  text-align: center;
  font-weight: lighter;
  font-variant-numeric: tabular-nums;

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 5em;
  }
`;

const Inputs = styled.div`
  text-align: center;
`;

const Note = styled.input`
  width: 600px;
  text-align: center;
  margin-top: 40px;
  border: 0;
  background: rgba(255, 255, 255, 0.7);
  color: black;
  padding: 15px 30px;
  font-size: 1.6em;
  border: none;
  transform: scale(1);
  transition: transform 250ms, background 250ms;

  &:hover,
  &:focus {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 1);
    z-index: 3;
    position: relative;
  }

  &::placeholder {
    font-size: 0.7em;
    text-transform: uppercase;
    font-weight: 100;
  }

  @media (${(props) => props.theme.breakpoint}) {
    padding: 10px 20px;
    font-size: 1.2em;
    width: 280px;
    margin-top: 20px;
  }
`;

const Buttons = styled.div`
  text-align: center;
  display: flex;
`;

const Button = styled.button`
  color: white;
  padding: 15px 30px;
  font-size: 1em;
  letter-spacing: 2px;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  border: none;
  transform: scale(1);
  transition: transform 250ms;

  &:hover,
  &:focus {
    transform: scale(1.1);
    z-index: 3;
    position: relative;
  }

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 0.9em;
    padding: 15px 25px;
    width: 100%;
  }
`;

const ResetButton = styled(Button)`
  background: ${(props) => props.theme.colors.one};
`;

const AddButton = styled(Button)`
  background: ${(props) => props.theme.colors.two};
`;
