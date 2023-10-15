"use client";

import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";

const Page = (props) => {
  const baseTitle = "Timelite";

  return (
    <>
      <Head>
        <title>
          {props.title ? `${props.title} — ${baseTitle}` : baseTitle}
        </title>
      </Head>
      <Content>{props.children}</Content>
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Page;

const Content = styled.div`
  margin-left: 50px;

  @media (${(props) => props.theme.breakpoint}) {
    margin-left: 0;
  }
`;
