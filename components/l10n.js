import React from "react";
import styled from "styled-components";

const L10n = props => {
  return (
    <Buttons>
      <Button onClick={() => props.setLanguage("en")}>English</Button>
      <Button onClick={() => props.setLanguage("jp")}>日本語</Button>
    </Buttons>
  );
};

export default L10n;

const Buttons = styled.div`
  position: fixed;
  bottom: 5px;
  left: 5px;
  z-index: 2;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  color: white;
  font-size: 1.2em;
  font-weight: lighter;
  opacity: 0.5;
  transition: opacity 250ms;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
