import React from "react";
import App, { Container } from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Grid from "../components/grid";
import Sidebar from "../components/sidebar";

const theme = {
  colors: {
    primary: "#1b1a23"
  },
  breakpoints: {
    medium: "max-width: 1023.99px"
  }
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

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
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
      toast.success("Loaded entries from local storage.", {
        position: toast.POSITION.TOP_LEFT
      });
    } else {
      toast.info(
        "Welcome to Timelite! You can use Timelite offline, all your data is stored locally.",
        {
          position: toast.POSITION.TOP_LEFT
        }
      );
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx);
    return { pageProps };
  }

  resetTime() {
    this.setState({
      time: new Date()
    });
  }

  addTimeLog(timeLog) {
    const timeLogs = [timeLog, ...this.state.timeLogs];
    this.setState({
      timeLogs: timeLogs
    });
    localStorage.setItem("timeLogs", JSON.stringify(timeLogs));
    toast.success("You've added an entry.", {
      position: toast.POSITION.TOP_LEFT
    });
  }

  removeTimeLog(timeLogIndex) {
    const timeLogs = this.state.timeLogs.filter((_, i) => i !== timeLogIndex);
    this.setState({
      timeLogs: timeLogs
    });
    localStorage.setItem("timeLogs", JSON.stringify(timeLogs));
    toast.error("You've deleted an entry.", {
      position: toast.POSITION.TOP_LEFT
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <GlobalStyle />
        <ReactTooltip place="left" effect="solid" />
        <ToastContainer />
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
