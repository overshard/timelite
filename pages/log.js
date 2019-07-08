import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Page from "../components/page";

const Log = props => {
  const getTotalTime = () => {
    let timerMiliseconds = props.timeLogs.reduce((total, entry) => {
      return total + entry.diff;
    }, 0);
    const timerTotal = [
      (timerMiliseconds / 1000 / 60 / 60) % 60, // Hours
      (timerMiliseconds / 1000 / 60) % 60, // Minutes
      (timerMiliseconds / 1000) % 60 // Seconds
    ];
    return timerTotal
      .map(timer => {
        let stringTime = Math.floor(timer).toString();
        if (stringTime.length < 2) stringTime = `0${stringTime}`;
        return stringTime;
      })
      .join(":");
  };

  return (
    <Page title="Log">
      <main>
        <h1>Log</h1>
        {props.timeLogs.length > 0 ? (
          <>
            <TransitionGroup component={null}>
              {props.timeLogs.map((log, index) => {
                const timeout = (index + 1) * 250;
                const transitionDelay = index * 125;
                return (
                  <CSSTransition
                    key={index}
                    appear
                    unmountOnExit
                    mountOnEnter
                    timeout={timeout}
                    classNames="fade"
                  >
                    <div
                      className="log__entry"
                      style={{ transitionDelay: `${transitionDelay}ms` }}
                    >
                      <div className="log__time">{log.time}</div>
                      <div className="log__note">{log.note}</div>
                      <button
                        className="log__remove"
                        onClick={() => {
                          props.removeTimeLog(index);
                        }}
                      >
                        x
                      </button>
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            <div className="log__total">
              <span>Total</span> {getTotalTime()}
            </div>
          </>
        ) : (
          <div className="log__nothing">No times added to your log yet!</div>
        )}
      </main>
      <style jsx>{`
        main {
          grid-area: main;
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
        .fade-appear,
        .fade-enter {
          opacity: 0;
          transform: translateY(100px);
        }
        .fade-appear-active,
        .fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition-duration: 250ms;
          transition-property: opacity, transform;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 250ms;
        }
        .log__entry {
          background-color: #ffffff;
          color: black;
          margin-bottom: 30px;
          border-radius: 3px;
          display: grid;
          grid-template-columns: 150px 1fr 50px;
          align-items: center;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          transform: scale(1);
          transition: transform 250ms;
        }
        .log__entry:hover {
          transform: scale(1.05);
        }
        .log__time {
          font-weight: bold;
          font-size: 1.3em;
          padding: 15px;
          height: 100%;
          background-color: #e2e2e2;
          text-align: center;
        }
        .log__note {
          padding: 15px;
        }
        .log__remove {
          font-size: 1.3em;
          font-weight: bolder;
          color: white;
          cursor: pointer;
          border: 0;
          background: red;
          margin: 0;
          padding: 15px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          height: 100%;
        }
        .log__nothing {
          text-align: center;
          font-size: 2em;
        }
        .log__total {
          font-weight: bolder;
          font-size: 2em;
          padding: 5px;
        }
        .log__total span {
          font-size: 0.4em;
          text-transform: uppercase;
          font-weight: lighter;
          display: block;
        }

        @media (max-width: 1023.99px) {
          h1 {
            font-size: 3em;
          }
          .log__nothing {
            font-size: 1.4em;
          }
          .log__entry {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            text-align: center;
          }
          .log__remove {
            padding: 5px;
          }
          .log__total {
            text-align: center;
          }
        }
      `}</style>
    </Page>
  );
};

Log.propTypes = {
  timeLogs: PropTypes.array,
  removeTimeLog: PropTypes.func
};

export default Log;
