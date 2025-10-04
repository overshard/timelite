import React, { useContext, useState, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

import Page from "../components/page";
import { Context } from "../components/context";
import Entry from "../components/entry";
import strings from "../l10n/log";
import contextStrings from "../l10n/context";
import { timeString } from "../utils/time";

import styles from "../styles/pages/log.module.css";

const Log = () => {
  const { state, dispatch } = useContext(Context);
  const [filter, setFilter] = useState({ type: "SHOW_ALL" });
  const nodeRefs = useRef(new Map());

  strings.setLanguage(state.language);

  const getTags = (entries) => {
    let tags = [];
    entries.map((entry) => tags.push(...entry.tags));
    return [...new Set(tags)];
  };

  const getVisibleEntries = (entries, filter) => {
    switch (filter.type) {
      case "SHOW_ALL":
        return entries;
      case "SHOW_TAG":
        return entries.filter((entry) => entry.tags.includes(filter.tag));
      default:
        return entries;
    }
  };

  const getTotalMilliseconds = () => {
    return state.log.reduce((total, entry) => {
      return total + (entry.end - entry.start);
    }, 0);
  };

  const getVisibleTotalMilliseconds = () => {
    return getVisibleEntries(state.log, filter).reduce((total, entry) => {
      return total + (entry.end - entry.start);
    }, 0);
  };

  const removeEntry = (id) => {
    if (getVisibleEntries(state.log, filter).length === 1) {
      setFilter({ type: "SHOW_ALL" });
    }
    dispatch({ type: "REMOVE_LOG", id: id });
    contextStrings.setLanguage(state.language);
    toast.error(contextStrings.deletedEntry);
  };

  const visibleEntries = getVisibleEntries(state.log, filter);

  return (
    <Page title="Log">
      <div className={styles.grid}>
        {state.log.length > 0 && (
          <aside className={styles.details}>
            <div className={styles.total}>
              <span>{strings.start}</span>
              {state.log[state.log.length - 1].start.toLocaleTimeString()}
            </div>
            <div className={styles.total}>
              <span>{strings.subtotal}</span>
              {timeString(getVisibleTotalMilliseconds())}
            </div>
            <div className={styles.total}>
              <span>{strings.total}</span>
              {timeString(getTotalMilliseconds())}
            </div>
            <CSVLink
              className={styles.csvButton}
              data={state.log}
              filename="timelite-export.csv"
            >
              {strings.export}
            </CSVLink>
          </aside>
        )}
        <main
          className={`${styles.main} ${
            getVisibleEntries(state.log, filter).length === 0
              ? styles.mainEmpty
              : ""
          }`.trim()}
          tabIndex="1"
        >
          {getTags(state.log).length > 0 && (
            <div className={styles.topBar}>
              <div className={styles.filters}>
                <span>{strings.tags}</span>
                {getTags(state.log).map((tag) => {
                  return (
                    <button
                      className={styles.filterButton}
                      key={tag}
                      onClick={() => setFilter({ type: "SHOW_TAG", tag: tag })}
                    >
                      {tag}
                    </button>
                  );
                })}
                <button
                  className={styles.filterButton}
                  onClick={() => setFilter({ type: "SHOW_ALL" })}
                >
                  {strings.show}
                </button>
              </div>
              {filter.tag ? (
                <button
                  className={styles.reset}
                  onClick={() => {
                    dispatch({ type: "CLEAR_TAG", tag: filter.tag });
                    setFilter({ type: "SHOW_ALL" });
                    contextStrings.setLanguage(state.language);
                    toast.error(contextStrings.deletedEntry);
                  }}
                >
                  {strings.clear} {filter.tag}
                </button>
              ) : (
                <button
                  className={styles.reset}
                  onClick={() => {
                    dispatch({ type: "CLEAR_LOG" });
                    contextStrings.setLanguage(state.language);
                    toast.error(contextStrings.resetLog);
                  }}
                >
                  {strings.clear}
                </button>
              )}
            </div>
          )}
          {visibleEntries.length > 0 ? (
            <>
              <TransitionGroup component={null}>
                {visibleEntries.map((entry, index) => {
                  const timeout = (index + 1) * 250;
                  const transitionDelay = index * 125;
                  let nodeRef = nodeRefs.current.get(entry.id);
                  if (!nodeRef) {
                    nodeRef = React.createRef();
                    nodeRefs.current.set(entry.id, nodeRef);
                  }
                  return (
                    <CSSTransition
                      key={entry.id}
                      appear
                      timeout={{ appear: timeout, enter: 250, exit: 250 }}
                      classNames="fade"
                      nodeRef={nodeRef}
                    >
                      <Entry
                        ref={nodeRef}
                        style={{ transitionDelay: `${transitionDelay}ms` }}
                        entry={entry}
                        removeEntry={removeEntry}
                        isSelected={state.logSelectedEntry}
                      />
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </>
          ) : (
            <div className={styles.nothing}>{strings.nothing}</div>
          )}
        </main>
      </div>
    </Page>
  );
};

export default Log;
