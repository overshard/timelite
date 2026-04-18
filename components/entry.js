import React, { useContext, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { timeString } from "../utils/time";
import { Context } from "../components/context";

import styles from "../styles/components/entry.module.css";

const extractTags = (text) =>
  text
    .split(/\s+/)
    .filter((word) => word.startsWith("#") && word.length > 1)
    .map((word) => word.toLowerCase());

const toDatetimeLocal = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const Entry = React.forwardRef(
  ({ entry, removeEntry, isSelected, style }, forwardedRef) => {
    const { state, dispatch } = useContext(Context);
    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        note: entry.note,
        start: toDatetimeLocal(entry.start),
        end: toDatetimeLocal(entry.end),
      },
    });
    const focusedEntry = useRef(null);
    const isEditing = state.edit && isSelected == entry.id;

    useEffect(() => {
      if (isEditing) {
        reset({
          note: entry.note,
          start: toDatetimeLocal(entry.start),
          end: toDatetimeLocal(entry.end),
        });
      }
    }, [isEditing, entry.id, entry.note, entry.start, entry.end, reset]);

    const setRefs = useCallback(
      (node) => {
        focusedEntry.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef && "current" in forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    const onSubmit = (data) => {
      const start = new Date(data.start);
      const end = new Date(data.end);
      if (isNaN(start) || isNaN(end) || end < start) {
        dispatch({ type: "TOGGLE_EDITION", edit: false });
        return;
      }
      dispatch({
        type: "EDIT_LOG",
        entry: {
          ...entry,
          start,
          end,
          note: data.note,
          tags: extractTags(data.note),
        },
      });
      dispatch({ type: "TOGGLE_EDITION", edit: false });
    };

    useEffect(() => {
      if (isSelected == entry.id && focusedEntry.current) {
        focusedEntry.current.focus();
        focusedEntry.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, [isSelected, entry.id]);

    const containerClasses = [styles.entryContainer];
    if (isSelected == entry.id) containerClasses.push(styles.selected);
    if (isEditing) {
      containerClasses.push(styles.zoom);
      containerClasses.push(styles.editing);
    }

    return (
      <div
        style={style}
        className={containerClasses.join(" ")}
        ref={setRefs}
        tabIndex={-1}
      >
        {isEditing ? (
          <form className={styles.entryForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.entryTime} ${styles.entryTimeEditing}`}>
              <div className={styles.entryDuration}>
                {timeString(entry.end - entry.start)}
              </div>
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
              <input
                {...register("note")}
                className={styles.entryNoteInput}
                autoFocus
                aria-label="Note"
                placeholder="Note with #tags"
              />
            </div>
            <button
              className={`${styles.entryButton} ${styles.entrySubmit}`}
              type="submit"
              aria-label="Save"
              title="Save (Enter)"
            >
              <IconCheck />
            </button>
            <button
              className={`${styles.entryButton} ${styles.entryRemove}`}
              type="button"
              aria-label="Cancel"
              title="Cancel"
              onClick={() => dispatch({ type: "TOGGLE_EDITION", edit: false })}
            >
              <IconX />
            </button>
          </form>
        ) : (
          <>
            <div className={styles.entryTime}>
              {timeString(entry.end - entry.start)}
              <span>{entry.start.toLocaleTimeString()}</span>
            </div>
            <div
              className={`${styles.entryNote} ${entry.note.length === 0 ? styles.entryNoteEmpty : ""}`.trim()}
            >
              {entry.note}
              {entry.tags.length > 0 && (
                <small>{entry.tags.join(", ")}</small>
              )}
            </div>
            <button
              className={`${styles.entryButton} ${styles.entryEdit}`}
              aria-label="Edit"
              onClick={() => {
                dispatch({ type: "SELECT_LOG_ITEM", id: entry.id });
                dispatch({ type: "TOGGLE_EDITION", edit: true });
              }}
            >
              <IconPencil />
            </button>
            <button
              className={`${styles.entryButton} ${styles.entryRemove}`}
              aria-label="Delete"
              onClick={() => {
                dispatch({ type: "SELECT_LOG_ITEM", id: "" });
                removeEntry(entry.id);
              }}
            >
              <IconTrash />
            </button>
          </>
        )}
      </div>
    );
  }
);

const IconPencil = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

Entry.propTypes = {
  entry: PropTypes.object,
  removeEntry: PropTypes.func,
  isSelected: PropTypes.string,
  style: PropTypes.object,
};

Entry.displayName = "Entry";

export default Entry;
