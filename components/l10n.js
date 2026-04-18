import React, { useContext } from "react";

import { Context } from "./context";

import styles from "../styles/components/l10n.module.css";

const L10n = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <select
      className={styles.select}
      onChange={(evt) => {
        dispatch({ type: "SET_LANGUAGE", language: evt.target.value });
      }}
      value={state.language}
    >
      <option value="en">English</option>
      <option value="jp">日本語</option>
      <option value="pl">Polski</option>
    </select>
  );
};

export default L10n;
