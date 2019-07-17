import React from "react";
import App, { Container } from "next/app";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Grid, GridLines } from "../components/grid";
import L10n from "../components/l10n";
import Sidebar from "../components/sidebar";
import strings from "../l10n/_app";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      timeLogs: [],
      language: "en"
    };
    this.addTimeLog = this.addTimeLog.bind(this);
    this.removeTimeLog = this.removeTimeLog.bind(this);
    this.resetTimeLog = this.resetTimeLog.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    strings.setLanguage(this.state.language);
  }

  componentDidMount() {
    const language = localStorage.getItem("language");
    if (language) {
      this.setLanguage(language);
      toast.info(strings.loadedLanguage);
    }
    const timeLogs = JSON.parse(localStorage.getItem("timeLogs"));
    if (timeLogs) {
      this.setState({
        timeLogs: timeLogs
      });
      toast.info(strings.loadedEntries);
    }
    const time = localStorage.getItem("time");
    if (time) {
      this.setState({
        time: new Date(time)
      });
      toast.info(strings.loadedTime);
    } else {
      const time = new Date();
      this.setState({
        time: time
      });
      localStorage.setItem("time", time.toString());
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx);
    return { pageProps };
  }

  resetTime() {
    const time = new Date();
    this.setState({
      time: time
    });
    localStorage.setItem("time", time.toString());
  }

  addTimeLog(timeLog) {
    const timeLogs = [timeLog, ...this.state.timeLogs];
    this.setState({
      timeLogs: timeLogs
    });
    localStorage.setItem("timeLogs", JSON.stringify(timeLogs));
    toast.success(strings.addedEntry);
  }

  removeTimeLog(timeLogId) {
    const timeLogs = this.state.timeLogs.filter(
      timeLog => timeLog.id !== timeLogId
    );
    this.setState({
      timeLogs: timeLogs
    });
    localStorage.setItem("timeLogs", JSON.stringify(timeLogs));
    toast.error(strings.deletedEntry);
  }

  resetTimeLog() {
    this.setState({
      timeLogs: []
    });
    localStorage.setItem("timeLogs", "[]");
    toast.error(strings.resetLog);
  }

  setLanguage(language) {
    this.setState({
      language: language
    });
    strings.setLanguage(language);
    localStorage.setItem("language", language);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <ToastContainer position={toast.POSITION.TOP_LEFT} />
            <GridLines />
            <L10n
              language={this.state.language}
              setLanguage={this.setLanguage}
            />
            <TransitionGroup component={null}>
              <CSSTransition
                key={this.props.router.route}
                appear
                timeout={{
                  appear: 500,
                  enter: 500,
                  exit: 250
                }}
                classNames="page-transition"
              >
                <Transition>
                  <Grid>
                    <Component
                      {...pageProps}
                      timeLogs={this.state.timeLogs}
                      addTimeLog={this.addTimeLog}
                      removeTimeLog={this.removeTimeLog}
                      resetTimeLog={this.resetTimeLog}
                      time={this.state.time}
                      resetTime={this.resetTime}
                      language={this.state.language}
                      setLanguage={this.setLanguage}
                    />
                  </Grid>
                </Transition>
              </CSSTransition>
            </TransitionGroup>
            <Sidebar
              language={this.state.language}
              setLanguage={this.setLanguage}
            />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;

const theme = {
  colors: {
    primary: "#1b1a23"
  },
  breakpoint: "max-width: 1023.99px"
};

// NOTE: Prevent renderblocking of Google WebFonts CSS by importing it here
const GlobalStyle = createGlobalStyle`
  body {
    font-family:
      -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: white;
    background-color: #1b1a23;
    min-height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
    text-rendering: optimizeLegibility;
  }
`;

const Transition = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  &.page-transition-appear,
  &.page-transition-enter {
    opacity: 0;
  }
  &.page-transition-appear-active,
  &.page-transition-enter-active {
    opacity: 1;
    transition-delay: 250ms;
    transition-duration: 250ms;
    transition-property: opacity;
  }
  &.page-transition-appear-done,
  &.page-transition-enter-done {
    opacity: 1;
  }
  &.page-transition-exit {
    opacity: 1;
  }
  &.page-transition-exit-active {
    opacity: 0;
    transition-duration: 250ms;
    transition-property: opacity;
  }
`;
