import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import Page from "../components/page";
import strings from "../l10n/about";

const About = props => {
  strings.setLanguage(props.language);

  return (
    <Page title="About">
      <Main>
        <Heading>{strings.title}</Heading>
        <Blockquote>{strings.quote}</Blockquote>
        <Creator
          href="https://www.isaacbythewood.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {strings.name}
        </Creator>
      </Main>
    </Page>
  );
};

About.propTypes = {
  language: PropTypes.string
};

export default About;

const FadeRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ScaleRight = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`;

const ScaleLeft = keyframes`
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
`;

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
  opacity: 0;
  animation-name: ${FadeRight};
  animation-fill-mode: forwards;
  animation-duration: 1000ms;
  animation-timing-function: ease-out;
  &::before {
    content: "";
    width: 50px;
    height: 5px;
    background-color: blue;
    display: block;
  }
  @media (${props => props.theme.breakpoint}) {
    font-size: 3em;
  }
`;

const Blockquote = styled.blockquote`
  font-size: 2.5em;
  margin: 0 auto;
  position: relative;
  max-width: 650px;
  opacity: 0;
  animation-name: ${FadeRight};
  animation-fill-mode: forwards;
  animation-duration: 1000ms;
  animation-delay: 500ms;
  animation-timing-function: ease-out;
  &::before {
    content: "”";
    position: absolute;
    top: 0;
    right: 0;
    font-size: 5em;
    opacity: 0.1;
    line-height: 0.5em;
  }
  @media (${props => props.theme.breakpoint}) {
    font-size: 1.2em;
  }
`;

const Creator = styled.a`
  font-size: 2em;
  display: block;
  margin-left: auto;
  opacity: 0.7;
  color: white;
  text-decoration: none;
  transition: opacity 250ms;
  position: relative;
  opacity: 0;
  animation-name: ${FadeRight};
  animation-fill-mode: forwards;
  animation-duration: 1000ms;
  animation-delay: 1000ms;
  animation-timing-function: ease-out;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: rgba(255, 255, 255, 1);
    transform-origin: left;
    animation: ${ScaleLeft} 300ms normal forwards;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
  }
  &:hover {
    &::before {
      animation: ${ScaleRight} 300ms normal forwards;
    }
  }
  @media (${props => props.theme.breakpoint}) {
    font-size: 1.2em;
  }
`;
