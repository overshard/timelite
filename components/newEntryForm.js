import React, { useContext, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";

import { Context } from "./context";
import TagNoteInput from "./tagNoteInput";

import styles from "../styles/components/entry.module.css";

const pad = (n) => String(n).padStart(2, "0");
const toDatetimeLocal = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const defaultStart = (log) => {
  if (log.length > 0) {
    const mostRecentEnd = new Date(log[0].end);
    const now = new Date();
    return mostRecentEnd < now ? mostRecentEnd : new Date(now.getTime() - 30 * 60 * 1000);
  }
  return new Date(Date.now() - 30 * 60 * 1000);
};

const NewEntryForm = ({ onClose }) => {
  const { state, dispatch } = useContext(Context);
  const start = defaultStart(state.log);
  const end = new Date();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      note: "",
      start: toDatetimeLocal(start),
      end: toDatetimeLocal(end),
    },
  });
  const allTags = useMemo(() => {
    const s = new Set();
    for (const e of state.log) for (const t of e.tags || []) s.add(t);
    return [...s].sort();
  }, [state.log]);

  const onSubmit = (data) => {
    const s = new Date(data.start);
    const e = new Date(data.end);
    if (isNaN(s) || isNaN(e) || e < s) {
      onClose();
      return;
    }
    dispatch({
      type: "ADD_MANUAL_LOG",
      start: s,
      end: e,
      note: data.note || "",
    });
    onClose();
  };

  return (
    <div
      className={`${styles.entryContainer} ${styles.editing} ${styles.selected}`}
    >
      <form className={styles.entryForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.entryTime} ${styles.entryTimeEditing}`}>
          <div className={styles.entryDuration}>New entry</div>
          <label className={styles.entryTimeRow}>
            <span className={styles.entryTimeRowLabel}>From</span>
            <input
              type="datetime-local"
              step="1"
              aria-label="Start time"
              className={styles.entryTimeInput}
              {...register("start")}
            />
          </label>
          <label className={styles.entryTimeRow}>
            <span className={styles.entryTimeRowLabel}>To</span>
            <input
              type="datetime-local"
              step="1"
              aria-label="End time"
              className={styles.entryTimeInput}
              {...register("end")}
            />
          </label>
        </div>
        <div className={styles.entryNote}>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TagNoteInput
                className={styles.entryNoteInput}
                aria-label="Note"
                placeholder="Note with #tags"
                autoFocus
                value={field.value}
                onChange={field.onChange}
                allTags={allTags}
              />
            )}
          />
        </div>
        <button
          className={`${styles.entryButton} ${styles.entrySubmit}`}
          type="submit"
          aria-label="Save"
          title="Save (Enter)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </button>
        <button
          className={`${styles.entryButton} ${styles.entryRemove}`}
          type="button"
          aria-label="Cancel"
          title="Cancel"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

NewEntryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewEntryForm;
