import React from "react";

import Page from "../components/page";
import Timer from "../components/timer";

const Index = props => {
  return (
    <Page title="Timer">
      <main>
        <Timer {...props} />
      </main>
      <style jsx>{`
        main {
          grid-area: main;
          justify-content: center;
          align-items: center;
          display: flex;
        }
      `}</style>
    </Page>
  );
};

export default Index;
