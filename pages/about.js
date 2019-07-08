import React from "react";

import Page from "../components/page";

const About = () => {
  return (
    <Page title="About">
      <main>
        <h1>Timelite?</h1>
        <p>{`Why is it 5 AM? Isn't there something simple I can use to track what I'm doing with all this time?`}</p>
        <p className="about__creator">
          {`— `}
          <a
            href="https://www.isaacbythewood.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Isaac Bythewood
          </a>
        </p>
      </main>
      <style jsx>{`
        main {
          grid-area: main;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
        h1 {
          font-size: 5em;
          font-weight: lighter;
          margin-top: 0;
        }
        h1::before {
          content: "";
          width: 50px;
          height: 5px;
          background-color: blue;
          display: block;
        }
        p {
          font-size: 2em;
          text-align: justify;
        }
        .about__creator {
          text-align: right;
        }
        .about__creator a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </Page>
  );
};

export default About;
