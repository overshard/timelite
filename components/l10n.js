import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Context } from "./context";

const L10n = () => {
  const { state } = useContext(Context);
  const { dispatch } = useContext(Context);

  // TODO: This should probably not be buttons and be a select box of some kind...
  return (
    <Select
      onChange={evt => {
        dispatch({ type: "SET_LANGUAGE", language: evt.target.value });
      }}
      value={state.language}
    >
      <option value="en">English</option>
      <option value="jp">日本語</option>
      <option value="pl">Polski</option>
    </Select>
  );
};

L10n.propTypes = {
  setLanguage: PropTypes.func
};

export default L10n;

const Select = styled.select`
  position: fixed;
  bottom: 5px;
  right: 5px;
  z-index: 2;
  background-color: ${props => props.theme.colors.four};
  color: white;
  padding: 5px;
  border: none;

  @media (${props => props.theme.breakpoint}) {
    top: 5px;
    right: 5px;
    text-align: center;
    bottom: auto;
  }
`;
