import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { toast } from "react-toastify";

import { Context } from "./context";
import TagNoteInput from "./tagNoteInput";
import strings from "../l10n/timer";
import contextStrings from "../l10n/context";
import { timeString, timeDiff } from "../utils/time";

import styles from "../styles/components/timer.module.css";

const Timer = () => {
  const { state, dispatch } = useContext(Context);
  const isPaused = !!state.timerPausedAt;
  const initialElapsed = isPaused
    ? +new Date(state.timerPausedAt) - +new Date(state.timer)
    : timeDiff(state.timer);
  const [time, setTime] = useState(timeString(initialElapsed));
  const refToMain = useRef(null);

  strings.setLanguage(state.language);

  useEffect(() => {
    if (isPaused) {
      const frozen = timeString(
        +new Date(state.timerPausedAt) - +new Date(state.timer)
      );
      setTime(frozen);
      document.title = `${frozen} — Timelite`;
      return;
    }
    setTime(timeString(timeDiff(state.timer)));
    const timerInterval = setInterval(() => {
      const timeCurrent = timeString(timeDiff(state.timer));
      setTime(timeCurrent);
      document.title = `${timeCurrent} — Timelite`;
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [state.timer, state.timerPausedAt, isPaused]);

  useEffect(() => {
    if (refToMain.current) {
      refToMain.current.focus();
    }
  }, []);

  const allTags = useMemo(() => {
    const s = new Set();
    for (const e of state.log) for (const t of e.tags || []) s.add(t);
    return [...s].sort();
  }, [state.log]);

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
      <div
        className={`${styles.time} ${isPaused ? styles.timePaused : ""}`.trim()}
        suppressHydrationWarning
      >
        {time}
        {isPaused && <span className={styles.pausedBadge}>{strings.paused}</span>}
      </div>
      <form onSubmit={submitForm}>
        <div className={styles.inputs}>
          <TagNoteInput
            ref={refToMain}
            className={styles.note}
            wrapperClassName={styles.noteWrap}
            aria-label={strings.note}
            placeholder={strings.note}
            value={state.note || ""}
            allTags={allTags}
            onChange={(val) => dispatch({ type: "NOTE_UPDATED", note: val })}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.resetButton} timer__button`}
            type="reset"
            onClick={() => dispatch({ type: "NEW_TIMER" })}
            title="⎇+R"
          >
            - {strings.reset}
          </button>
          <button
            className={`${styles.button} ${styles.pauseButton} timer__button`}
            type="button"
            onClick={() =>
              dispatch({ type: isPaused ? "RESUME_TIMER" : "PAUSE_TIMER" })
            }
            title="⎇+P"
          >
            {isPaused ? strings.resume : strings.pause}
          </button>
          <button
            className={`${styles.button} ${styles.addButton} timer__button`}
            type="submit"
            title="⎇+A"
          >
            {strings.add} +
          </button>
        </div>
      </form>
    </>
  );
};

export default Timer;
