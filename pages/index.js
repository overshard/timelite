import React from "react";
import styled, { keyframes } from "styled-components";

import Page from "../components/page";
import Timer from "../components/timer";

const Index = () => {
  return (
    <Page title="Timer">
      <Background />
      <Main>
        <Timer />
      </Main>
    </Page>
  );
};

export default Index;

const FadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(#1b1a23, transparent),
    linear-gradient(to top left, #1a3f52, transparent),
    linear-gradient(to top right, #1f0000, transparent);
  background-blend-mode: screen;
  background-size: cover;
`;

const Main = styled.main`
  grid-area: main;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  animation-name: ${FadeUp};
  animation-direction: forwards;
  animation-duration: 500ms;
`;
