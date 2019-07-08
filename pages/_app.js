import React from "react";
import App, { Container } from "next/app";

import Grid from "../components/grid";
import Sidebar from "../components/sidebar";

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
    if (timeLogs)
      this.setState({
        timeLogs: timeLogs
      });
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
  }

  removeTimeLog(timeLogIndex) {
    const timeLogs = this.state.timeLogs.filter((_, i) => i !== timeLogIndex);
    this.setState({
      timeLogs: timeLogs
    });
    localStorage.setItem("timeLogs", JSON.stringify(timeLogs));
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
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
      </Container>
    );
  }
}

export default MyApp;
