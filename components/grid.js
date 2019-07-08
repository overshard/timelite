import React from "react";
import PropTypes from "prop-types";

const Grid = props => {
  return (
    <>
      <div className="grid grid-lines">
        <div className="grid-column grid-column-1" />
        <div className="grid-column grid-column-2" />
        <div className="grid-column grid-column-3" />
        <div className="grid-column grid-column-4" />
        <div className="grid-column grid-column-5" />
        <div className="grid-column grid-column-6" />
      </div>
      <div className="grid">{props.children}</div>
      <style jsx>{`
        .grid {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 60px 15% auto auto 15% 60px;
          grid-template-rows: auto auto auto;
          grid-template-areas:
            ". . .    .    . sidebar"
            ". . main main . sidebar"
            ". . .    .    . sidebar";
          grid-column-start: 3;
          grid-column-end: 5;
          grid-row-start: 2;
          grid-row-end: 2;
        }

        .grid-lines {
          position: fixed;
          width: 100%;
          height: 100vh;
          pointer-events: none;
        }

        .grid-column {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          grid-row: 1 / -1;
        }

        .grid-column-1 {
          grid-column 1;
        }

        .grid-column-2 {
          grid-column 2;
        }

        .grid-column-3 {
          grid-column 3;
        }

        .grid-column-4 {
          grid-column 4;
        }

        .grid-column-5 {
          grid-column 5;
        }

        .grid-column-6 {
          grid-column 6;
        }
      `}</style>
    </>
  );
};

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Grid;
