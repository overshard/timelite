import React from "react";
import styled, { keyframes } from "styled-components";

import Page from "../components/page";
import Timer from "../components/timer";

const Index = () => {
  return (
    <Page title="Timer">
      <Background />
      <Grid>
        <Main>
          <Timer />
        </Main>
      </Grid>
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
  background-image: linear-gradient(
      ${props => props.theme.colors.one},
      transparent
    ),
    linear-gradient(
      to top left,
      ${props => props.theme.colors.four},
      transparent
    ),
    linear-gradient(
      to top right,
      ${props => props.theme.colors.five},
      transparent
    );
  background-blend-mode: screen;
  background-size: cover;
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
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  animation-name: ${FadeUp};
  animation-direction: forwards;
  animation-duration: 500ms;
`;
