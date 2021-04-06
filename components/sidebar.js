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
            <TimerIcon />
          </Page>
        </Link>
        <Link href="/log" passHref>
          <Page active={router.pathname === "/log"} aria-label={strings.log}>
            <LogIcon />
          </Page>
        </Link>
      </Pages>
      <Link href="/about" passHref>
        <About aria-label={strings.about}>
          <HelpIcon />
        </About>
      </Link>
    </Side>
  );
};

Sidebar.propTypes = {
  router: PropTypes.object,
  language: PropTypes.string,
};

export default withRouter(Sidebar);

const Side = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (${(props) => props.theme.breakpoint}) {
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    top: auto;
    flex-direction: row;
    align-items: center;
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.one};
  text-transform: uppercase;
  font-size: 2em;
  font-weight: 900;
  text-align: center;
  padding: 10px 0px;
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  line-height: 1.5em;

  @media (${(props) => props.theme.breakpoint}) {
    padding: 0px 10px;
    font-size: 1.4em;
    writing-mode: horizontal-tb;
    text-orientation: mixed;
  }
`;

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  @media (${(props) => props.theme.breakpoint}) {
    flex-direction: row;
    padding: 5px;
  }
`;

const Page = styled.a`
  text-decoration: none;
  position: relative;
  display: flex;
  margin-bottom: 1rem;
  transition: color 300ms, font-size 300ms, transform 300ms;
  font-size: 2em;
  font-weight: 100;
  ${(props) =>
    props.active ? "color: rgba(0, 0, 0, 1);" : "color: rgba(0, 0, 0, 0.5);"}

  &:hover {
    transform: scale(1.5);
  }

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 1.4em;
    margin-bottom: 0;
    margin-right: 15px;

    &:hover {
      font-size: 1.5em;
    }
  }
`;

const About = styled.a`
  text-align: center;
  padding: 10px 0;
  display: block;
  text-decoration: none;
  font-family: monospace;
  background: ${(props) => props.theme.colors.two};
  color: white;
  line-height: 0;
  transition: transform 300ms;

  &:hover {
    transform: scale(1.5);
  }

  @media (${(props) => props.theme.breakpoint}) {
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
`;

const HelpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
    </svg>
  );
};

const TimerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.07 1.01h-6v2h6v-2zm-4 13h2v-6h-2v6zm8.03-6.62l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.14 4.74 14.19 4 12.07 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.11-.74-4.06-1.97-5.61zm-7.03 12.62c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
    </svg>
  );
};

const LogIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
    </svg>
  );
};
