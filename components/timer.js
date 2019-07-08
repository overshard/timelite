import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = props => {
  const [time, setTime] = useState("00:00:00");
  const [note, setNote] = useState("");

  useEffect(() => {
    // NOTE: Run this immediately to improve moving between pages
    setTime(getTimeCurrent());

    const timerInterval = setInterval(() => {
      setTime(getTimeCurrent());
    }, 1000);

    const cleanup = () => {
      clearInterval(timerInterval);
    };

    return cleanup;
  }, [props.time]);

  const getTimeCurrent = () => {
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
    <div className="timer">
      <div className="timer__time">{time}</div>
      <form onSubmit={submitForm}>
        <div className="timer__inputs">
          <input
            className="timer__note"
            type="text"
            placeholder="Note"
            value={note}
            onChange={onChangeNote}
          />
        </div>
        <div className="timer__buttons">
          <button className="timer__button" type="reset" onClick={resetTime}>
            - Reset
          </button>
          <button className="timer__button" type="submit">
            Add +
          </button>
        </div>
      </form>
      <style jsx>{`
        .timer__time {
          font-size: 10em;
          text-align: center;
          font-weight: lighter;
        }
        .timer__buttons {
          text-align: center;
        }
        .timer__button {
          margin: 0 20px;
          border: 0;
          color: white;
          background: #73724c;
          padding: 10px 15px;
          font-size: 1em;
          letter-spacing: 4px;
          width: 150px;
          cursor: pointer;
          text-transform: uppercase;
          font-weight: lighter;
          transform: scale(1);
          transition: transform 250ms;
        }
        .timer__button:hover,
        .timer__buton:focus {
          transform: scale(1.1);
        }
        .timer__inputs {
          text-align: center;
        }
        .timer__note {
          width: 100%;
          text-align: center;
          margin-bottom: 25px;
          border: 0;
          background: white;
          color: black;
          padding: 15px 30px;
          font-size: 1.6em;
          box-shadow: 1px 1px 0px white;
          transform: scale(1);
          transition: transform 250ms;
        }
        .timer__note:hover,
        .timer__note:focus {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.object,
  resetTime: PropTypes.func,
  addTimeLog: PropTypes.func
};

export default Timer;
