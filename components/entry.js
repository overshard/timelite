import React, { useContext, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { timeString } from "../utils/time";
import { Context } from "../components/context";

import styles from "../styles/components/entry.module.css";

const Entry = React.forwardRef(
  ({ entry, removeEntry, isSelected, style }, forwardedRef) => {
  const { state, dispatch } = useContext(Context);
  const { register, handleSubmit } = useForm();
  const focusedEntry = useRef(null);

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
    dispatch({
      type: "EDIT_LOG",
      entry: {
        ...entry,
        note: data.note,
        tags: data.note
          .split(" ")
          .filter((word) => word.startsWith("#"))
          .map((word) => {
            return word.toLowerCase();
          }),
      },
    });
    dispatch({ type: "TOGGLE_EDITION", edit: false, submited: true });
  };

  useEffect(() => {
    if (isSelected == entry.id && focusedEntry.current) {
      focusedEntry.current.focus();
      focusedEntry.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const highlight = isSelected == entry.id ? { filter: "invert(1)" } : {};
  const combinedStyle = { ...(style || {}), ...highlight };
  const containerClasses = [styles.entryContainer];
  if (state.edit) containerClasses.push(styles.zoom);

  return (
    <div
  style={combinedStyle}
      className={containerClasses.join(" ")}
      ref={setRefs}
      tabIndex={-1}
    >
      {state.edit && isSelected == entry.id ? (
        <form className={styles.entryForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.entryTime}>
            {timeString(entry.end - entry.start)}
            <span>{entry.start.toLocaleTimeString()}</span>
          </div>
          <div className={styles.entryNote}>
            <input
              {...register("note")}
              className={styles.entryNoteInput}
              name="note"
              autoFocus
              value={state.log.find((x) => x.id == entry.id).note || ""}
              onChange={(e) =>
                dispatch({
                  type: "EDIT_LOG",
                  entry: {
                    ...entry,
                    note: e.target.value,
                    tags: e.target.value
                      .split(" ")
                      .filter((word) => word.startsWith("#"))
                      .map((word) => {
                        return word.toLowerCase();
                      }),
                  },
                })
              }
            />
          </div>
          <button
            className={`${styles.entryButton} ${styles.entrySubmit}`}
            type="submit"
          >
            ✔
          </button>
          <button
            className={`${styles.entryButton} ${styles.entryRemove}`}
            type="button"
            onClick={() => dispatch({ type: "TOGGLE_EDITION", edit: false })}
          >
            x
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
              <small>
                {entry.tags
                  .map((tag) => {
                    return tag;
                  })
                  .join(", ")}
              </small>
            )}
          </div>
          <button
            className={`${styles.entryButton} ${styles.entryEdit}`}
            onClick={() => {
              dispatch({ type: "SELECT_LOG_ITEM", id: entry.id });
              dispatch({ type: "TOGGLE_EDITION", edit: true });
            }}
          >
            _
          </button>
          <button
            className={`${styles.entryButton} ${styles.entryRemove}`}
            onClick={() => {
              dispatch({ type: "SELECT_LOG_ITEM", id: "" });
              removeEntry(entry.id);
            }}
          >
            x
          </button>
        </>
      )}
    </div>
  );
  }
);

Entry.propTypes = {
  entry: PropTypes.object,
  removeEntry: PropTypes.func,
  isSelected: PropTypes.string,
  style: PropTypes.object,
};

Entry.displayName = "Entry";

export default Entry;
