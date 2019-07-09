import React from "react";
import styled from "styled-components";

import Page from "../components/page";

const About = () => {
  return (
    <Page title="About">
      <Main>
        <Heading>Timelite?</Heading>
        <Blockquote>{`Why is it 5 AM? Isn't there something simple I can use to track what I'm doing with all this time?`}</Blockquote>
        <Creator
          href="https://www.isaacbythewood.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          — Isaac Bythewood
        </Creator>
      </Main>
    </Page>
  );
};

export default About;

const Main = styled.main`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-size: 5em;
  font-weight: lighter;
  margin-top: 0;
  &::before {
    content: "";
    width: 50px;
    height: 5px;
    background-color: blue;
    display: block;
  }
  @media (max-width: 1023.99px) {
    font-size: 3em;
  }
`;

const Blockquote = styled.blockquote`
  font-size: 2.5em;
  margin: 0 auto;
  position: relative;
  max-width: 650px;
  &::before {
    content: "”";
    position: absolute;
    top: 0;
    right: 0;
    font-size: 5em;
    opacity: 0.1;
    line-height: 0.5em;
  }
  @media (max-width: 1023.99px) {
    font-size: 1.2em;
  }
`;

const Creator = styled.a`
  font-size: 2em;
  display: block;
  text-align: right;
  opacity: 0.7;
  color: white;
  text-decoration: none;
  transition: opacity 250ms;
  &:hover {
    opacity: 1;
  }
  @media (max-width: 1023.99px) {
    font-size: 1.2em;
  }
`;
