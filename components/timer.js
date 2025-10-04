import React, { useState, useEffect, useContext, useRef } from "react";
import { toast } from "react-toastify";

import { Context } from "./context";
import strings from "../l10n/timer";
import contextStrings from "../l10n/context";
import { timeString, timeDiff } from "../utils/time";

import styles from "./timer.module.css";

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
    if (refToMain.current) {
      refToMain.current.focus();
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (state.note.trim()) {
      dispatch({ type: "ADD_LOG", note: state.note });
      dispatch({ type: "NOTE_UPDATED", note: "" });
      contextStrings.setLanguage(state.language);
      toast.success(contextStrings.addedEntry);
    }
  };

  return (
    <>
      <div className={styles.time} suppressHydrationWarning>
        {time}
      </div>
      <form onSubmit={submitForm}>
        <div className={styles.inputs}>
          <input
            className={styles.note}
            type="text"
            aria-label={strings.note}
            placeholder={strings.note}
            value={state.note || ""}
            ref={refToMain}
            onChange={(e) =>
              dispatch({ type: "NOTE_UPDATED", note: e.target.value })
            }
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.resetButton} timer__button`}
            type="reset"
            onClick={() => dispatch({ type: "NEW_TIMER" })}
          >
            - {strings.reset}
          </button>
          <button
            className={`${styles.button} ${styles.addButton} timer__button`}
            type="submit"
          >
            {strings.add} +
          </button>
        </div>
      </form>
    </>
  );
};

export default Timer;
