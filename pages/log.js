import React, { useContext, useState, useRef, useMemo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

import Page from "../components/page";
import { Context } from "../components/context";
import Entry from "../components/entry";
import NewEntryForm from "../components/newEntryForm";
import strings from "../l10n/log";
import contextStrings from "../l10n/context";
import { timeString } from "../utils/time";
import {
  parseImport,
  buildJsonExport,
  buildMarkdownExport,
  downloadTextFile,
} from "../utils/importExport";

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

const dayKeyOf = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const dayLabelOf = (date, l10nStrings) => {
  const d = date instanceof Date ? date : new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  const yesterday = new Date(today.getTime() - 86400000);
  if (sameDay(d, today)) return l10nStrings.today;
  if (sameDay(d, yesterday)) return l10nStrings.yesterday;
  return null;
};

const Log = () => {
  const { state, dispatch } = useContext(Context);
  const [filter, setFilter] = useState({ type: "SHOW_ALL" });
  const [addingEntry, setAddingEntry] = useState(false);
  const importInputRef = useRef(null);
  const nodeRefs = useRef(new Map());

  const handleImportClick = () => {
    if (importInputRef.current) importInputRef.current.click();
  };

  const handleImportFile = async (event) => {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const entries = parseImport(text, file.name);
      if (entries.length === 0) {
        toast.error("Nothing to import.");
        return;
      }
      if (
        !window.confirm(
          `Import ${entries.length} entr${entries.length === 1 ? "y" : "ies"} and merge into your log?`
        )
      ) {
        return;
      }
      dispatch({ type: "IMPORT_LOG", entries });
      toast.success(`Imported ${entries.length} entries.`);
    } catch (err) {
      toast.error(`Import failed: ${err.message || err}`);
    }
  };

  const handleExportMarkdown = () => {
    const md = buildMarkdownExport(state.log);
    downloadTextFile(
      md,
      `timelite-export-${new Date().toISOString().slice(0, 10)}.md`,
      "text/markdown;charset=utf-8"
    );
  };

  const handleExportJson = () => {
    const json = buildJsonExport(state.log);
    downloadTextFile(
      json,
      `timelite-export-${new Date().toISOString().slice(0, 10)}.json`,
      "application/json;charset=utf-8"
    );
  };

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

  const groupedByDay = useMemo(() => {
    const groups = [];
    let current = null;
    for (const entry of visibleEntries) {
      const key = dayKeyOf(entry.start);
      if (!current || current.key !== key) {
        current = { key, date: new Date(entry.start), totalMs: 0, entries: [] };
        groups.push(current);
      }
      current.entries.push(entry);
      current.totalMs +=
        +new Date(entry.end) - +new Date(entry.start);
    }
    return groups;
  }, [visibleEntries]);

  if (isEmpty) {
    return (
      <Page title="Log">
        <div className="page-grid">
          <main className="page-main">
            <h1 className="page-title">{strings.pageTitle}</h1>
            {addingEntry ? (
              <NewEntryForm onClose={() => setAddingEntry(false)} />
            ) : (
              <div className={styles.emptyActions}>
                <button
                  className={styles.actionButton}
                  onClick={() => setAddingEntry(true)}
                >
                  + {strings.addEntry}
                </button>
                <button
                  className={styles.actionButton}
                  onClick={handleImportClick}
                >
                  ↑ {strings.importData}
                </button>
                <input
                  ref={importInputRef}
                  type="file"
                  accept=".csv,.json,text/csv,application/json"
                  style={{ display: "none" }}
                  onChange={handleImportFile}
                />
              </div>
            )}
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
          </div>

          <div className={styles.actionsBar}>
            <button
              className={styles.actionButton}
              onClick={() => setAddingEntry(true)}
              disabled={addingEntry}
            >
              + {strings.addEntry}
            </button>
            <button
              className={styles.actionButton}
              onClick={handleImportClick}
            >
              ↑ {strings.importData}
            </button>
            <CSVLink
              className={styles.actionButton}
              data={csvData}
              headers={CSV_HEADERS}
              filename={`timelite-export-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`}
            >
              ↓ {strings.export}
            </CSVLink>
            <button
              className={styles.actionButton}
              onClick={handleExportMarkdown}
            >
              ↓ {strings.exportMd}
            </button>
            <button
              className={styles.actionButton}
              onClick={handleExportJson}
            >
              ↓ {strings.exportJson}
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept=".csv,.json,text/csv,application/json"
              style={{ display: "none" }}
              onChange={handleImportFile}
            />
          </div>

          {addingEntry && (
            <NewEntryForm onClose={() => setAddingEntry(false)} />
          )}

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
                <button
                  className={styles.reset}
                  onClick={clearAll}
                  title="⎇+C"
                >
                  {strings.clear}
                </button>
              )}
            </div>
          )}

          {visibleEntries.length > 0 ? (
            groupedByDay.map((group, groupIndex) => {
              const customLabel = dayLabelOf(group.date, strings);
              const dateLabel = group.date.toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              });
              return (
                <React.Fragment key={group.key}>
                  <div className={styles.dayHeader}>
                    <div>
                      <span className={styles.dayHeaderLabel}>
                        {customLabel || dateLabel}
                      </span>
                      {customLabel && (
                        <span className={styles.dayHeaderDate}>
                          {dateLabel}
                        </span>
                      )}
                    </div>
                    <span className={styles.dayHeaderTotal}>
                      {timeString(group.totalMs)}
                    </span>
                  </div>
                  <TransitionGroup component={null}>
                    {group.entries.map((entry, index) => {
                      const appearIndex = groupIndex * 4 + index;
                      const timeout = (appearIndex + 1) * 250;
                      const transitionDelay = appearIndex * 125;
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
                </React.Fragment>
              );
            })
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
