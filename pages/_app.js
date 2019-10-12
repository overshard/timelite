import React from "react";
import App, { Container } from "next/app";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ContextProvider } from "../components/context";

import L10n from "../components/l10n";
import Sidebar from "../components/sidebar";
import { theme } from "../site.config";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx);
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <ContextProvider>
            <GlobalStyle />
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
            <L10n />
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
                  <Component {...pageProps} />
                </Transition>
              </CSSTransition>
            </TransitionGroup>
            <Sidebar />
          </ContextProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;

const GlobalStyle = createGlobalStyle`
  body {
    font-family:
      -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: white;
    background-color: ${props => props.theme.colors.one};
    min-height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
    text-rendering: optimizeLegibility;
  }

  input {
    font-family:
      -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
