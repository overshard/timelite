import React from "react";
import styled from "styled-components";

import Page from "../components/page";
import Timer from "../components/timer";

const Index = props => {
  return (
    <Page title="Timer">
      <Main>
        <Timer {...props} />
      </Main>
    </Page>
  );
};

export default Index;

const Main = styled.main`
  grid-area: main;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
