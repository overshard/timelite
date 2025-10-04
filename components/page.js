import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import styles from "./page.module.css";

const Page = (props) => {
  const baseTitle = "Timelite";

  return (
    <>
      <Head>
        <title>
          {props.title ? `${props.title} — ${baseTitle}` : baseTitle}
        </title>
      </Head>
      <div className={styles.content}>{props.children}</div>
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
