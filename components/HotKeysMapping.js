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
  TIMER_PAGE: "alt+m",
  LOG_PAGE: "alt+l",
  ABOUT_PAGE: "alt+o",
  CLEAR_LOG: "alt+c"
};

const HotKeysMapping = props => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();
  const handlers = {
    ADD_LOG: event => dispatch({ type: "ADD_LOG", note: state.note }),
    TIMER_PAGE: event => router.push("/"),
    LOG_PAGE: event => router.push("/log"),
    ABOUT_PAGE: event => router.push("/about"),
    CLEAR_LOG: event => dispatch({ type: "CLEAR_LOG" })
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {props.children}
    </HotKeys>
  );
};

export default HotKeysMapping;
