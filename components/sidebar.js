import React, { useContext } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Context } from "./context";
import strings from "../l10n/sidebar";

const Sidebar = ({ router }) => {
  const { state } = useContext(Context);
  strings.setLanguage(state.language);

  return (
    <Side>
      <Title>{strings.name}</Title>
      <Pages>
        <Link href="/" passHref>
          <Page active={router.pathname === "/"} aria-label={strings.timer}>
            <Tooltip>{strings.timer}</Tooltip>
          </Page>
        </Link>
        <Link href="/log" passHref>
          <Page active={router.pathname === "/log"} aria-label={strings.log}>
            <Tooltip>{strings.log}</Tooltip>
          </Page>
        </Link>
      </Pages>
      <Link href="/about" passHref>
        <About aria-label={strings.about}>?</About>
      </Link>
    </Side>
  );
};

Sidebar.propTypes = {
  router: PropTypes.object,
  language: PropTypes.string
};

export default withRouter(Sidebar);

const Side = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60px;
  grid-area: sidebar;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (${props => props.theme.breakpoint}) {
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    top: auto;
    flex-direction: row;
  }
`;

const Title = styled.div`
  color: #000000;
  font-size: 1.5em;
  font-weight: bolder;
  writing-mode: vertical-rl;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  transform: rotate(-180deg);
  white-space: nowrap;
  @media (${props => props.theme.breakpoint}) {
    writing-mode: horizontal-tb;
    transform: none;
    padding: 4px 10px;
  }
`;

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (${props => props.theme.breakpoint}) {
    flex-direction: row;
  }
`;

const Page = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  width: 10px;
  height: 60px;
  margin-bottom: 25px;
  transition: background-color 200ms;
  ${props =>
    props.active
      ? "background-color: rgba(0, 0, 0, 1);"
      : "background-color: rgba(0, 0, 0, 0.5);"}
  &:hover {
    background-color: rgba(0, 0, 0, 1);
    & > div {
      visibility: visible;
      @media (${props => props.theme.breakpoint}) {
        visibility: hidden;
      }
    }
  }
  @media (${props => props.theme.breakpoint}) {
    width: 60px;
    height: 10px;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  right: 150%;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-decoration: none;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 2px;
  visibility: hidden;
`;

const About = styled.a`
  background: #000000;
  text-align: center;
  padding: 5px 0;
  display: block;
  color: white;
  text-decoration: none;
  font-family: monospace;
  @media (${props => props.theme.breakpoint}) {
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
