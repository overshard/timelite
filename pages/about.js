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
      <GitHubLink
        href="https://github.com/overshard/timelite"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubLogo>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </GitHubLogo>
      </GitHubLink>
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
          <DescriptionContainer>
            <KeysColumn>
              <SectionTitle>{strings.sectionTimer}</SectionTitle>
              <KeysDescription>
                <span>⎇+r</span> {strings.keyReset}
              </KeysDescription>
              <KeysDescription>
                <span>⎇+a</span> {strings.keyAddLog}
              </KeysDescription>
              <SectionTitle>{strings.sectionNavigation}</SectionTitle>
              <KeysDescription>
                <span>⎇+t</span> {strings.keyTimerPage}
              </KeysDescription>
              <KeysDescription>
                <span>⎇+l</span> {strings.keyLogPage}
              </KeysDescription>
              <KeysDescription>
                <span>⎇+o</span> {strings.keyAboutPage}
              </KeysDescription>
            </KeysColumn>
            <KeysColumn>
              <SectionTitle>{strings.sectionLog}</SectionTitle>
              <KeysDescription>
                <span>↓</span> {strings.keyNextLogEntry}
              </KeysDescription>
              <KeysDescription>
                <span>↑</span> {strings.keyPreviousLogEntry}
              </KeysDescription>
              <KeysDescription>
                <span>⎇+e</span> {strings.keyEditEntry}
              </KeysDescription>
              <KeysDescription>
                <span>⎇+d</span> {strings.keyDeleteSingleEntry}
              </KeysDescription>
              <KeysDescription>
                <span>⎇+c</span> {strings.keyClearLog}
              </KeysDescription>
            </KeysColumn>
          </DescriptionContainer>
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

const GitHubLink = styled.a`
  text-decoration: none;
`;

const GitHubLogo = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  opacity: 0.5;
  transition-property: opacity;
  transition-duration: 250ms;

  &:hover {
    opacity: 1;
  }

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 3em;
    right: unset;
    left: 20px;
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
  font-size: 4em;
  font-weight: lighter;
  margin-top: 0;
  opacity: 0;
  animation-name: ${FadeRight};
  animation-fill-mode: forwards;
  animation-duration: 1000ms;
  animation-timing-function: ease-out;

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 3em;
  }
`;

const Blockquote = styled.blockquote`
  font-size: 1.5em;
  margin: 0 auto 40px auto;
  position: relative;
  max-width: 500px;
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

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 1.2em;
  }
`;

const Creator = styled.a`
  font-size: 1.5em;
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
    bottom: -10px;
    height: 2px;
    background: ${(props) => props.theme.colors.three};
    transform-origin: left;
    animation: ${ScaleLeft} 300ms normal forwards;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    height: 2px;
    background: ${(props) => props.theme.colors.three};
    opacity: 0.2;
    pointer-events: none;
  }

  &:hover {
    &::before {
      animation: ${ScaleRight} 300ms normal forwards;
    }
  }

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 1.2em;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  margin-top: 2em;

  @media (${(props) => props.theme.breakpoint}) {
    display: none;
  }
`;

const KeysColumn = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  position: relative;
  text-align: left;
  max-width: 500px;
  opacity: 0;
  margin-bottom: 0;
  animation-name: ${FadeRight};
  animation-fill-mode: forwards;
  animation-duration: 1000ms;
  animation-delay: 1500ms;
  animation-timing-function: ease-out;
`;

const KeysDescription = styled.div`
  font-size: 1em;
  position: relative;
  opacity: 0;
  animation-name: ${FadeRight};
  animation-fill-mode: forwards;
  animation-duration: 1000ms;
  animation-delay: 2000ms;
  animation-timing-function: ease-out;
  margin-bottom: 0;

  span {
    width: 45px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.3);
    font-family: monospace;
    text-align: center;
    font-size: 1.1em;
  }

  @media (${(props) => props.theme.breakpoint}) {
    font-size: 1.2em;
  }
`;
