import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

import Page from "../components/page";
import { Context } from "../components/context";
import strings from "../l10n/about";

const About = () => {
  const { state } = useContext(Context);
  strings.setLanguage(state.language);

  return (
    <Page title="About">
      <Grid>
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
      </Grid>
    </Page>
  );
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr 20%;
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100vh;
`;

const Main = styled.main`
  grid-area: 2/2;
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
  @media (${props => props.theme.breakpoint}) {
    font-size: 3em;
  }
`;

const Blockquote = styled.blockquote`
  font-size: 2.5em;
  margin: 0 auto 40px auto;
  position: relative;
  max-width: 500px;
  opacity: 0;
  color: ${props => props.theme.colors.four};
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
