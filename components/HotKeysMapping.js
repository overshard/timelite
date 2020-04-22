import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import { HotKeys, configure } from "react-hotkeys";
import PropTypes from "prop-types";

import { Context } from "../components/context";

configure({
  ignoreTags: [],
  //logLevel: "debug",
  /* below is workaround for bug in react-hotkeys 
  "[BUG] typing a space in <input /> will disable all hotkeys in that <input /> #237" 
  causing hotkeys to after pressing a whitespace character (space, enter,..) 
  in one of the per default ignored elements (input, textarea...), 
  this whitespace character is included in the combination for all further hotkeys.*/
  ignoreEventsCondition: keyEvent => {
    if (keyEvent.key === "Enter" || keyEvent.key === " ") {
      return true;
    }
    return false;
  }
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
  LOG_DELETE_SINGLE: "alt+d"
};

const HotKeysMapping = props => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();

  const autofocus = el => {
    const found = ReactDOM.findDOMNode(el);
    if (found && !state.edit) {
      found.focus();
    }
  };
  const handlers = {
    RESET: event => dispatch({ type: "NEW_TIMER" }),
    ADD_LOG: event => {
      event.preventDefault();
      dispatch({ type: "ADD_LOG", note: state.note });
    },
    TIMER_PAGE: event => {
      event.preventDefault();
      router.push("/");
    },
    LOG_PAGE: event => router.push("/log"),
    ABOUT_PAGE: event => router.push("/about"),
    CLEAR_LOG: event => dispatch({ type: "CLEAR_LOG" }),
    LOG_NEXT: event => {
      event.preventDefault();
      if (
        window.location.href.substr(window.location.href.length - 3) == "log"
      ) {
        dispatch({ type: "LOG_EDIT_TOGLE", edit: false });
        dispatch({ type: "NEXT_LOG_ITEM" });
      }
    },
    LOG_PREVIOUS: event => {
      event.preventDefault();

      if (
        window.location.href.substr(window.location.href.length - 3) == "log"
      ) {
        dispatch({ type: "LOG_EDIT_TOGLE", edit: false });
        dispatch({ type: "PREVIOUS_LOG_ITEM" });
      }
    },
    LOG_EDIT: event => {
      event.preventDefault();
      if (!state.logSelectedEntry) return;
      if (window.location.href.substr(window.location.href.length - 3) == "log")
        dispatch({ type: "TOGGLE_EDITION", edit: true });
    },
    LOG_DELETE_SINGLE: event => {
      event.preventDefault();
      if (!state.logSelectedEntry) return;
      if (window.location.href.substr(window.location.href.length - 3) == "log")
        dispatch({ type: "REMOVE_LOG" });
    }
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers} ref={autofocus}>
      {props.children}
    </HotKeys>
  );
};

HotKeysMapping.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default HotKeysMapping;
