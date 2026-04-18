import React, { useContext } from "react";
import { useRouter } from "next/router";
import { GlobalHotKeys, configure } from "react-hotkeys";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { Context } from "../components/context";
import contextStrings from "../l10n/context";

configure({
  ignoreTags: [],
  ignoreEventsCondition: (keyEvent) => {
    if (keyEvent.key === "Enter" || keyEvent.key === " ") {
      return true;
    }
    return false;
  },
});

const keyMap = {
  RESET: "alt+r",
  ADD_LOG: "alt+a",
  TIMER_PAGE: "alt+t",
  LOG_PAGE: "alt+l",
  ABOUT_PAGE: "alt+o",
  SUMMARY_PAGE: "alt+s",
  CLEAR_LOG: "alt+c",
  LOG_NEXT: "ArrowDown",
  LOG_PREVIOUS: "ArrowUp",
  LOG_EDIT: "alt+e",
  LOG_DELETE_SINGLE: "alt+d",
};

const HotKeysMapping = (props) => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();

  const onLogPage = () => router.pathname === "/log";

  const handlers = {
    RESET: () => dispatch({ type: "NEW_TIMER" }),
    ADD_LOG: (event) => {
      event.preventDefault();
      if (state.note.trim()) {
        dispatch({ type: "ADD_LOG", note: state.note });
        contextStrings.setLanguage(state.language);
        toast.success(contextStrings.addedEntry);
      }
    },
    TIMER_PAGE: (event) => {
      event.preventDefault();
      router.push("/");
    },
    LOG_PAGE: () => router.push("/log"),
    ABOUT_PAGE: () => router.push("/about"),
    SUMMARY_PAGE: () => router.push("/summary"),
    CLEAR_LOG: () => {
      if (state.log.length === 0) return;
      contextStrings.setLanguage(state.language);
      if (!window.confirm(contextStrings.confirmClearLog)) return;
      dispatch({ type: "CLEAR_LOG" });
      toast.error(contextStrings.resetLog);
    },
    LOG_NEXT: (event) => {
      event.preventDefault();
      if (onLogPage()) {
        dispatch({ type: "TOGGLE_EDITION", edit: false });
        dispatch({ type: "NEXT_LOG_ITEM" });
      }
    },
    LOG_PREVIOUS: (event) => {
      event.preventDefault();
      if (onLogPage()) {
        dispatch({ type: "TOGGLE_EDITION", edit: false });
        dispatch({ type: "PREVIOUS_LOG_ITEM" });
      }
    },
    LOG_EDIT: (event) => {
      event.preventDefault();
      if (!state.logSelectedEntry) return;
      if (onLogPage()) dispatch({ type: "TOGGLE_EDITION", edit: true });
    },
    LOG_DELETE_SINGLE: (event) => {
      event.preventDefault();
      if (!state.logSelectedEntry) return;
      if (!onLogPage()) return;
      contextStrings.setLanguage(state.language);
      if (!window.confirm(contextStrings.confirmDeleteEntry)) return;
      dispatch({ type: "REMOVE_LOG" });
      toast.error(contextStrings.deletedEntry);
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      {props.children}
    </GlobalHotKeys>
  );
};

HotKeysMapping.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default HotKeysMapping;
