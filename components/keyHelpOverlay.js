import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "../styles/components/keyHelpOverlay.module.css";

const ROWS = [
  { section: "Timer", keys: [
    ["⎇+A", "Add log entry"],
    ["⎇+R", "Reset timer"],
    ["⎇+P", "Pause / resume"],
  ]},
  { section: "Navigation", keys: [
    ["⎇+T", "Timer page"],
    ["⎇+L", "Log page"],
    ["⎇+S", "Summary page"],
    ["⎇+O", "About page"],
  ]},
  { section: "Log", keys: [
    ["↓", "Next entry"],
    ["↑", "Previous entry"],
    ["⎇+E", "Edit entry"],
    ["⎇+D", "Delete entry"],
    ["⎇+C", "Clear all"],
  ]},
  { section: "Help", keys: [
    ["?", "Toggle this overlay"],
    ["Esc", "Close overlay"],
  ]},
];

const KeyHelpOverlay = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-label="Keyboard shortcuts"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span className={styles.title}>Shortcuts</span>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
            title="Esc"
          >
            ✕
          </button>
        </div>
        <div className={styles.grid}>
          {ROWS.map(({ section, keys }) => (
            <div key={section} className={styles.column}>
              <div className={styles.sectionLabel}>{section}</div>
              {keys.map(([k, label]) => (
                <div key={k} className={styles.row}>
                  <span className={styles.key}>{k}</span>
                  <span className={styles.label}>{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

KeyHelpOverlay.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default KeyHelpOverlay;
