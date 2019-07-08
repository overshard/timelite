import React, { useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const Page = props => {
  const baseTitle = "Timelite";

  useEffect(() => {
    window.scrollTo = 0;
  });

  return (
    <>
      <Head>
        <title>
          {props.title ? `${props.title} — ${baseTitle}` : baseTitle}
        </title>
      </Head>
      {props.children}
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Page;
