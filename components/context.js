import React, { useEffect } from "react";
import { useReducer, createContext } from "react";
import PropTypes from "prop-types";
import localForage from "localforage";

const newId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const initialState = {
  note: "",
  language: "en",
  timer: new Date(),
  timerPausedAt: null,
  log: [],
  logSelectedEntry: "",
  edit: false,
};

const Context = createContext();

const reducer = (state, action) => {
  let newState = {};

  switch (action.type) {
    case "LOCALDATA_READY":
      return { ...action.localdata };
    case "SET_LANGUAGE":
      newState = {
        ...state,
        language: action.language,
      };
      localForage.setItem("context", newState);
      return newState;
    case "NEW_TIMER":
      newState = {
        ...state,
        timer: new Date(),
        timerPausedAt: null,
      };
      localForage.setItem("context", newState);
      return newState;
    case "PAUSE_TIMER":
      if (state.timerPausedAt) return state;
      newState = {
        ...state,
        timerPausedAt: new Date(),
      };
      localForage.setItem("context", newState);
      return newState;
    case "RESUME_TIMER": {
      if (!state.timerPausedAt) return state;
      const pausedElapsed =
        +new Date(state.timerPausedAt) - +new Date(state.timer);
      newState = {
        ...state,
        timer: new Date(Date.now() - pausedElapsed),
        timerPausedAt: null,
      };
      localForage.setItem("context", newState);
      return newState;
    }
    case "NOTE_UPDATED":
      newState = {
        ...state,
        note: action.note,
      };
      localForage.setItem("context", newState);
      return newState;
    case "ADD_LOG": {
      const end = state.timerPausedAt
        ? new Date(state.timerPausedAt)
        : new Date();
      newState = {
        ...state,
        timer: new Date(),
        timerPausedAt: null,
        log: [
          {
            id: newId(),
            start: state.timer,
            end,
            note: state.note,
            tags: state.note
              .split(/\s+/)
              .filter((word) => word.startsWith("#") && word.length > 1)
              .map((word) => word.toLowerCase()),
          },
          ...state.log,
        ],
        note: "",
      };
      localForage.setItem("context", newState);
      return newState;
    }
    case "IMPORT_LOG": {
      const existingIds = new Set(state.log.map((e) => e.id));
      const prepared = action.entries.map((e) => ({
        ...e,
        id: !e.id || existingIds.has(e.id) ? newId() : e.id,
      }));
      const merged = [...state.log, ...prepared].sort(
        (a, b) => +new Date(b.start) - +new Date(a.start)
      );
      newState = { ...state, log: merged };
      localForage.setItem("context", newState);
      return newState;
    }
    case "ADD_MANUAL_LOG": {
      const { start, end, note } = action;
      const entry = {
        id: newId(),
        start,
        end,
        note,
        tags: note
          .split(/\s+/)
          .filter((word) => word.startsWith("#") && word.length > 1)
          .map((word) => word.toLowerCase()),
      };
      const merged = [...state.log, entry].sort(
        (a, b) => +new Date(b.start) - +new Date(a.start)
      );
      newState = { ...state, log: merged };
      localForage.setItem("context", newState);
      return newState;
    }
    case "EDIT_LOG":
      newState = {
        ...state,
        log: [
          ...state.log.map((entry) => {
            return entry.id == action.entry.id ? action.entry : entry;
          }),
        ],
      };
      localForage.setItem("context", newState);
      return newState;
    case "REMOVE_LOG":
      if (action.id !== undefined)
        newState = {
          ...state,
          log: [...state.log.filter((entry) => entry.id !== action.id)],
          logSelectedEntry:
            state.logSelectedEntry == action.id ? "" : state.logSelectedEntry,
        };
      else {
        newState = {
          ...state,
          log: [
            ...state.log.filter((entry) => entry.id !== state.logSelectedEntry),
          ],
          logSelectedEntry: "",
        };
      }
      localForage.setItem("context", newState);
      return newState;
    case "CLEAR_LOG":
      newState = {
        ...state,
        log: [],
        logSelectedEntry: "",
        edit: false,
      };
      localForage.setItem("context", newState);
      return newState;
    case "CLEAR_TAG":
      newState = {
        ...state,
        log: [...state.log.filter((entry) => !entry.tags.includes(action.tag))],
      };
      localForage.setItem("context", newState);
      return newState;
    case "NEXT_LOG_ITEM":
      if (state.log.length === 0) return state;
      if (!state.logSelectedEntry) {
        newState = { ...state, logSelectedEntry: state.log[0].id };
      } else {
        const index = state.log.findIndex(
          (el) => el.id == state.logSelectedEntry
        );
        if (index + 1 < state.log.length)
          newState = { ...state, logSelectedEntry: state.log[index + 1].id };
        else newState = { ...state };
      }
      localForage.setItem("context", newState);
      return newState;
    case "PREVIOUS_LOG_ITEM":
      if (state.log.length === 0) return state;
      if (!state.logSelectedEntry) {
        newState = { ...state, logSelectedEntry: state.log[0].id };
      } else {
        const index = state.log.findIndex(
          (el) => el.id == state.logSelectedEntry
        );
        if (index - 1 >= 0) {
          newState = { ...state, logSelectedEntry: state.log[index - 1].id };
        } else newState = { ...state };
      }
      localForage.setItem("context", newState);
      return newState;
    case "SELECT_LOG_ITEM":
      newState = { ...state, logSelectedEntry: action.id };
      localForage.setItem("context", newState);
      return newState;
    case "TOGGLE_EDITION":
      newState = { ...state, edit: action.edit };
      localForage.setItem("context", newState);
      return newState;
    default:
      return state;
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localForage
        .getItem("context")
        .then((value) => {
          if (value !== null)
            dispatch({ type: "LOCALDATA_READY", localdata: value });
        })
        .catch(() => {});
    }
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
