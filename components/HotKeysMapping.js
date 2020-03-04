import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { HotKeys, configure } from "react-hotkeys";
import { Context } from "../components/context";

configure({
  ignoreTags: []
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
  SUBMIT_LOG: "Enter"
};

const HotKeysMapping = props => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();
  const handlers = {
    RESET: event => dispatch({ type: "NEW_TIMER" }),
    ADD_LOG: event => dispatch({ type: "ADD_LOG", note: state.note }),
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
        dispatch({ type: "LOG_EDIT_TOGLE", edit: true });
    },
    LOG_DELETE_SINGLE: event => {
      event.preventDefault();
      if (!state.logSelectedEntry) return;
      if (window.location.href.substr(window.location.href.length - 3) == "log")
        dispatch({ type: "REMOVE_LOG" });
    },
    SUBMIT_LOG: event => {
      if (
        window.location.href.substr(window.location.href.length - 3) == "log" 
      ) {
        event.preventDefault();
        dispatch({ type: "LOG_EDIT_TOGLE", edit: false });
      }
    }
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {props.children}
    </HotKeys>
  );
};

export default HotKeysMapping;
