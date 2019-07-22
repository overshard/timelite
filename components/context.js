import React, { useEffect } from "react";
import { useReducer, createContext } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import { toast } from "react-toastify";
import localForage from "localforage";

import strings from "../l10n/context";

const initialState = {
  language: "en",
  timer: new Date(),
  log: []
};

const Context = createContext();

const reducer = (state, action) => {
  let newState = {};

  strings.setLanguage(state.language);

  switch (action.type) {
    case "LOCALDATA_READY":
      strings.setLanguage(action.localdata.language);
      toast.info(strings.loaded);
      return { ...action.localdata };
    case "SET_LANGUAGE":
      newState = {
        ...state,
        language: action.language
      };
      localForage.setItem("context", newState);
      return newState;
    case "NEW_TIMER":
      newState = {
        ...state,
        timer: new Date()
      };
      localForage.setItem("context", newState);
      return newState;
    case "ADD_LOG":
      newState = {
        ...state,
        timer: new Date(),
        log: [
          {
            id: uuid(), // HACK: react-transition-group requires an id?
            start: state.timer,
            end: new Date(),
            note: action.note
          },
          ...state.log
        ]
      };
      localForage.setItem("context", newState);
      toast.success(strings.addedEntry);
      return newState;
    case "REMOVE_LOG":
      newState = {
        ...state,
        log: [...state.log.filter(entry => entry.id !== action.id)]
      };
      localForage.setItem("context", newState);
      toast.error(strings.deletedEntry);
      return newState;
    case "RESET_LOG":
      newState = {
        ...state,
        log: []
      };
      localForage.setItem("context", newState);
      toast.error(strings.resetLog);
      return newState;
    default:
      return state;
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    localForage
      .getItem("context")
      .then(value => {
        if (value !== null)
          dispatch({ type: "LOCALDATA_READY", localdata: value });
      })
      // FIXME: localForage will error with SSR rendering, what do if anything?
      .catch(() => {});
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
