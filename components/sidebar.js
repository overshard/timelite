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
            {strings.timer}
          </Page>
        </Link>
        <Link href="/log" passHref>
          <Page active={router.pathname === "/log"} aria-label={strings.log}>
            {strings.log}
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
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
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
  color: ${props => props.theme.colors.one};
  text-transform: uppercase;
  font-size: 2em;
  font-weight: 900;
  text-align: center;
  padding: 15px;
  white-space: nowrap;

  @media (${props => props.theme.breakpoint}) {
    padding: 4px 10px;
    font-size: 1.5em;
  }
`;

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  @media (${props => props.theme.breakpoint}) {
    flex-direction: row;
    padding: 5px;
  }
`;

const Page = styled.a`
  text-decoration: none;
  position: relative;
  display: flex;
  margin-bottom: 5px;
  transition: color 300ms, font-size 300ms;
  font-size: 2em;
  font-weight: 100;
  ${props =>
    props.active ? "color: rgba(0, 0, 0, 1);" : "color: rgba(0, 0, 0, 0.5);"}

  &:hover {
    color: rgba(0, 0, 0, 1);
    font-size: 3em;
  }

  @media (${props => props.theme.breakpoint}) {
    font-size: 1.5em;
    margin-bottom: 0;
    margin-right: 15px;

    &:hover {
      font-size: 1.5em;
    }
  }
`;

const About = styled.a`
  text-align: center;
  padding: 5px 0;
  display: block;
  text-decoration: none;
  font-family: monospace;

  @media (${props => props.theme.breakpoint}) {
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
