import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Grid = props => {
  return (
    <>
      <GridLines>
        <GridColumn column={1} />
        <GridColumn column={2} />
        <GridColumn column={3} />
        <GridColumn column={4} />
        <GridColumn column={5} />
        <GridColumn column={6} />
      </GridLines>
      <GridTemplate>{props.children}</GridTemplate>
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

const GridTemplate = styled.div`
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

  @media (max-width: 1023.99px) {
    grid-template-columns: 40px 10px auto auto 10px 40px;
  }
`;

const GridLines = styled(GridTemplate)`
  position: fixed;
  width: 100%;
  height: 100vh;
  pointer-events: none;

  @media (max-width: 1023.99px) {
    display: none;
  }
`;

const GridColumn = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  grid-row: 1 / -1;
  grid-column: ${props => props.column};
`;
