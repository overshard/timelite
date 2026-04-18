import React, { useContext, useState, useRef, useMemo } from "react";
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

const CSV_HEADERS = [
  { label: "id", key: "id" },
  { label: "start", key: "start" },
  { label: "end", key: "end" },
  { label: "duration_seconds", key: "duration_seconds" },
  { label: "note", key: "note" },
  { label: "tags", key: "tags" },
];

const sanitizeCell = (value) => {
  if (value == null) return "";
  const str = String(value);
  if (/^[=+\-@\t\r]/.test(str)) return `'${str}`;
  return str;
};

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

  const csvData = useMemo(
    () =>
      state.log.map((entry) => {
        const start =
          entry.start instanceof Date ? entry.start : new Date(entry.start);
        const end = entry.end instanceof Date ? entry.end : new Date(entry.end);
        return {
          id: entry.id,
          start: start.toISOString(),
          end: end.toISOString(),
          duration_seconds: Math.round((end - start) / 1000),
          note: sanitizeCell(entry.note),
          tags: sanitizeCell((entry.tags || []).join(" ")),
        };
      }),
    [state.log]
  );

  const removeEntry = (id) => {
    contextStrings.setLanguage(state.language);
    if (!window.confirm(contextStrings.confirmDeleteEntry)) return;
    if (getVisibleEntries(state.log, filter).length === 1) {
      setFilter({ type: "SHOW_ALL" });
    }
    dispatch({ type: "REMOVE_LOG", id: id });
    toast.error(contextStrings.deletedEntry);
  };

  const clearAll = () => {
    contextStrings.setLanguage(state.language);
    if (!window.confirm(contextStrings.confirmClearLog)) return;
    dispatch({ type: "CLEAR_LOG" });
    toast.error(contextStrings.resetLog);
  };

  const clearTag = () => {
    contextStrings.setLanguage(state.language);
    if (!window.confirm(contextStrings.confirmClearTag)) return;
    dispatch({ type: "CLEAR_TAG", tag: filter.tag });
    setFilter({ type: "SHOW_ALL" });
    toast.error(contextStrings.deletedEntry);
  };

  const visibleEntries = getVisibleEntries(state.log, filter);
  const isEmpty = state.log.length === 0;

  if (isEmpty) {
    return (
      <Page title="Log">
        <div className="page-grid">
          <main className="page-main">
            <h1 className="page-title">{strings.pageTitle}</h1>
          </main>
        </div>
        <div className="empty-state">
          <p className="empty-state-title">{strings.nothing}</p>
          <p className="empty-state-hint">{strings.emptyHint}</p>
        </div>
      </Page>
    );
  }

  const startTimeLabel = state.log[state.log.length - 1].start.toLocaleTimeString();

  return (
    <Page title="Log">
      <div className="page-grid">
        <main className="page-main">
          <h1 className="page-title">{strings.pageTitle}</h1>

          <div className={styles.tiles}>
            <div className={styles.tile}>
              <span className={styles.tileLabel}>{strings.start}</span>
              <span className={styles.tileValue}>{startTimeLabel}</span>
            </div>
            <div className={styles.tile}>
              <span className={styles.tileLabel}>{strings.subtotal}</span>
              <span className={styles.tileValue}>
                {timeString(getVisibleTotalMilliseconds())}
              </span>
            </div>
            <div className={styles.tile}>
              <span className={styles.tileLabel}>{strings.total}</span>
              <span className={styles.tileValue}>
                {timeString(getTotalMilliseconds())}
              </span>
            </div>
            <div className={styles.tile}>
              <span className={styles.tileLabel}>{strings.entries}</span>
              <span className={styles.tileValue}>{state.log.length}</span>
            </div>
            <CSVLink
              className={styles.tileExport}
              data={csvData}
              headers={CSV_HEADERS}
              filename={`timelite-export-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`}
            >
              <span className={styles.tileLabel}>{strings.export}</span>
              <span className={styles.tileExportGlyph}>↓</span>
            </CSVLink>
          </div>

          {getTags(state.log).length > 0 && (
            <div className={styles.topBar}>
              <div className={styles.filters}>
                <span className={styles.filtersLabel}>{strings.tags}</span>
                {getTags(state.log).map((tag) => {
                  const active = filter.type === "SHOW_TAG" && filter.tag === tag;
                  return (
                    <button
                      className={`${styles.filterButton} ${active ? styles.filterButtonActive : ""}`.trim()}
                      key={tag}
                      onClick={() => setFilter({ type: "SHOW_TAG", tag: tag })}
                    >
                      {tag}
                    </button>
                  );
                })}
                {filter.type === "SHOW_TAG" && (
                  <button
                    className={styles.filterButton}
                    onClick={() => setFilter({ type: "SHOW_ALL" })}
                  >
                    {strings.show}
                  </button>
                )}
              </div>
              {filter.tag ? (
                <button className={styles.reset} onClick={clearTag}>
                  {strings.clear} {filter.tag}
                </button>
              ) : (
                <button className={styles.reset} onClick={clearAll}>
                  {strings.clear}
                </button>
              )}
            </div>
          )}

          {visibleEntries.length > 0 ? (
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
          ) : (
            <div className={styles.nothingFiltered}>
              {strings.nothingFiltered}
            </div>
          )}
        </main>
      </div>
    </Page>
  );
};

export default Log;
