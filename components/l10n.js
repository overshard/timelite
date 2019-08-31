import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Context } from "./context";

const L10n = () => {
  const { dispatch } = useContext(Context);

  // TODO: This should probably not be buttons and be a select box of some kind...
  return (
    <Buttons>
      <Button
        onClick={() => dispatch({ type: "SET_LANGUAGE", language: "en" })}
      >
        English
      </Button>
      <Button
        onClick={() => dispatch({ type: "SET_LANGUAGE", language: "jp" })}
      >
        日本語
      </Button>
    </Buttons>
  );
};

L10n.propTypes = {
  setLanguage: PropTypes.func
};

export default L10n;

const Buttons = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  z-index: 2;
  @media (${props => props.theme.breakpoint}) {
    top: 5px;
    right: 5px;
    text-align: center;
    bottom: auto;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  color: white;
  font-size: 1.2em;
  font-weight: lighter;
  opacity: 0.7;
  transition: opacity 250ms;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  @media (${props => props.theme.breakpoint}) {
    font-size: 0.8em;
  }
`;
