import React, { useContext } from "react";
import { useRouter } from "next/router";
import { GlobalHotKeys, configure } from "react-hotkeys";
import PropTypes from "prop-types";

import { Context } from "../components/context";

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
  CLEAR_LOG: "alt+c",
  LOG_NEXT: "ArrowDown",
  LOG_PREVIOUS: "ArrowUp",
  LOG_EDIT: "alt+e",
  LOG_DELETE_SINGLE: "alt+d",
};

const HotKeysMapping = (props) => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();

  const handlers = {
    RESET: () => dispatch({ type: "NEW_TIMER" }),
    ADD_LOG: (event) => {
      event.preventDefault();
      dispatch({ type: "ADD_LOG", note: state.note });
    },
    TIMER_PAGE: (event) => {
      event.preventDefault();
      router.push("/");
    },
    LOG_PAGE: () => router.push("/log"),
    ABOUT_PAGE: () => router.push("/about"),
    CLEAR_LOG: () => dispatch({ type: "CLEAR_LOG" }),
    LOG_NEXT: (event) => {
      event.preventDefault();
      if (
        window.location.href.substr(window.location.href.length - 3) == "log"
      ) {
        dispatch({ type: "LOG_EDIT_TOGLE", edit: false });
        dispatch({ type: "NEXT_LOG_ITEM" });
      }
    },
    LOG_PREVIOUS: (event) => {
      event.preventDefault();

      if (
        window.location.href.substr(window.location.href.length - 3) == "log"
      ) {
        dispatch({ type: "LOG_EDIT_TOGLE", edit: false });
        dispatch({ type: "PREVIOUS_LOG_ITEM" });
      }
    },
    LOG_EDIT: (event) => {
      event.preventDefault();
      if (!state.logSelectedEntry) return;
      if (window.location.href.substr(window.location.href.length - 3) == "log")
        dispatch({ type: "TOGGLE_EDITION", edit: true });
    },
    LOG_DELETE_SINGLE: (event) => {
      event.preventDefault();
      if (!state.logSelectedEntry) return;
      if (window.location.href.substr(window.location.href.length - 3) == "log")
        dispatch({ type: "REMOVE_LOG" });
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
