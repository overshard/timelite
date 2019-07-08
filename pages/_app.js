import React from "react";
import App, { Container } from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Grid from "../components/grid";
import Sidebar from "../components/sidebar";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      timeLogs: []
    };
    this.addTimeLog = this.addTimeLog.bind(this);
    this.removeTimeLog = this.removeTimeLog.bind(this);
    this.resetTime = this.resetTime.bind(this);
  }

  componentDidMount() {
    const timeLogs = JSON.parse(localStorage.getItem("timeLogs"));
    if (timeLogs) {
      this.setState({
        timeLogs: timeLogs
      });
      toast.info("Loaded entries from local storage.");
    }
    const time = localStorage.getItem("time");
    if (time) {
      this.setState({
        time: new Date(time)
      });
      toast.info("Loaded time from local storage.");
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
    toast.success("You've added an entry.");
  }

  removeTimeLog(timeLogIndex) {
    const timeLogs = this.state.timeLogs.filter((_, i) => i !== timeLogIndex);
    this.setState({
      timeLogs: timeLogs
    });
    localStorage.setItem("timeLogs", JSON.stringify(timeLogs));
    toast.error("You've deleted an entry.");
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <GlobalStyle />
        <ReactTooltip place="left" effect="solid" />
        <ToastContainer position={toast.POSITION.TOP_LEFT} />
        <ThemeProvider theme={theme}>
          <Grid>
            <Component
              {...pageProps}
              timeLogs={this.state.timeLogs}
              addTimeLog={this.addTimeLog}
              removeTimeLog={this.removeTimeLog}
              time={this.state.time}
              resetTime={this.resetTime}
            />
            <Sidebar />
          </Grid>
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

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
  }

  body {
    color: #ffffff;
    background-color: #1b1a23;
    min-height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;
