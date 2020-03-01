import React, { useContext } from "react";
import { useRouter } from "next/router";
import { HotKeys, configure } from "react-hotkeys";
import PropTypes from "prop-types";

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
  CLEAR_LOG: "alt+c"
};

const HotKeysMapping = props => {
  const { state, dispatch } = useContext(Context);

  const router = useRouter();
  const handlers = {
    RESET: () => dispatch({ type: "NEW_TIMER" }),
    ADD_LOG: () => dispatch({ type: "ADD_LOG", note: state.note }),
    TIMER_PAGE: event => {
      event.preventDefault();
      router.push("/");
    },
    LOG_PAGE: () => router.push("/log"),
    ABOUT_PAGE: () => router.push("/about"),
    CLEAR_LOG: () => dispatch({ type: "CLEAR_LOG" })
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
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
