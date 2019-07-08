import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const Sidebar = ({ router }) => {
  return (
    <Side>
      <Title>Timelite</Title>
      <Pages>
        <Link href="/" passHref>
          <Page active={router.pathname === "/"} data-tip="Timer" />
        </Link>
        <Link href="/log" passHref>
          <Page active={router.pathname === "/log"} data-tip="Log" />
        </Link>
      </Pages>
      <Link href="/about" passHref>
        <About>?</About>
      </Link>
    </Side>
  );
};

Sidebar.propTypes = {
  router: PropTypes.object
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
  @media (max-width: 1023.99px) {
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
  transform: rotate(-90deg) translateX(-70px);
  @media (max-width: 1023.99px) {
    transform: none;
    padding: 4px 10px;
  }
`;

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1023.99px) {
    flex-direction: row;
  }
`;

const Page = styled.a`
  position: relative;
  content: "";
  width: 10px;
  height: 60px;
  display: block;
  margin-bottom: 25px;
  transition: background-color 200ms;
  ${props =>
    props.active
      ? "background-color: rgba(0, 0, 0, 1);"
      : "background-color: rgba(0, 0, 0, 0.5);"}
  &:hover {
    background-color: rgba(0, 0, 0, 1);
  }
  @media (max-width: 1023.99px) {
    width: 60px;
    height: 10px;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const About = styled.a`
  background: #000000;
  text-align: center;
  padding: 5px 0;
  display: block;
  color: white;
  text-decoration: none;
  font-family: monospace;
  @media (max-width: 1023.99px) {
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
