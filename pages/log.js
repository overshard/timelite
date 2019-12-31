import React, { useContext, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

import Page from "../components/page";
import { Context } from "../components/context";
import Entry from "../components/entry";
import strings from "../l10n/log";
import { timeString } from "../utils/time";

const Log = () => {
  const { state, dispatch } = useContext(Context);
  const [filter, setFilter] = useState({ type: "SHOW_ALL" });

  strings.setLanguage(state.language);

  const getTags = entries => {
    let tags = [];
    entries.map(entry => tags.push(...entry.tags));
    return [...new Set(tags)];
  };

  const getVisibleEntries = (entries, filter) => {
    switch (filter.type) {
      case "SHOW_ALL":
        return entries;
      case "SHOW_TAG":
        return entries.filter(entry => entry.tags.includes(filter.tag));
      default:
        return entries;
    }
  };

  const getTotalMilliseconds = () => {
    return state.log.reduce((total, entry) => {
      return total + (entry.end - entry.start);
    }, 0);
  };

  const getVisibleTotalMilliseconds = () => {
    return getVisibleEntries(state.log, filter).reduce((total, entry) => {
      return total + (entry.end - entry.start);
    }, 0);
  };

  const removeEntry = id => {
    if (getVisibleEntries(state.log, filter).length === 1) {
      setFilter({ type: "SHOW_ALL" });
    }
    dispatch({ type: "REMOVE_LOG", id: id });
  };

  return (
    <Page title="Log">
      <Grid>
        {state.log.length > 0 && (
          <Details>
            <Total>
              <span>{strings.start}</span>
              {state.log[state.log.length - 1].start.toLocaleTimeString()}
            </Total>
            <Total>
              <span>{strings.subtotal}</span>
              {timeString(getVisibleTotalMilliseconds())}
            </Total>
            <Total>
              <span>{strings.total}</span>
              {timeString(getTotalMilliseconds())}
            </Total>
          </Details>
        )}
        <Main
          className={
            getVisibleEntries(state.log, filter).length === 0 && "empty"
          }
        >
          {getTags(state.log).length > 0 && (
            <TopBar>
              <Filters>
                <span>{strings.tags}</span>
                {getTags(state.log).map(tag => {
                  return (
                    <FilterButton
                      key={tag}
                      onClick={() => setFilter({ type: "SHOW_TAG", tag: tag })}
                    >
                      {tag}
                    </FilterButton>
                  );
                })}
                <FilterButton onClick={() => setFilter({ type: "SHOW_ALL" })}>
                  {strings.show}
                </FilterButton>
              </Filters>
              {filter.tag ? (
                <Reset
                  onClick={() => {
                    dispatch({ type: "CLEAR_TAG", tag: filter.tag });
                    setFilter({ type: "SHOW_ALL" });
                  }}
                >
                  {strings.clear} {filter.tag}
                </Reset>
              ) : (
                <Reset onClick={() => dispatch({ type: "CLEAR_LOG" })}>
                  {strings.clear}
                </Reset>
              )}
            </TopBar>
          )}
          {getVisibleEntries(state.log, filter).length > 0 ? (
            <>
              <TransitionGroup component={null}>
                {getVisibleEntries(state.log, filter).map((entry, index) => {
                  const timeout = (index + 1) * 250;
                  const transitionDelay = index * 125;
                  return (
                    <CSSTransition
                      key={entry.id}
                      appear
                      timeout={{ appear: timeout, enter: 250, exit: 250 }}
                      classNames="fade"
                    >
                      <Entry
                        style={{ transitionDelay: `${transitionDelay}ms` }}
                        entry={entry}
                        removeEntry={removeEntry}
                      />
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </>
          ) : (
            <Nothing>{strings.nothing}</Nothing>
          )}
        </Main>
      </Grid>
    </Page>
  );
};

export default Log;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  width: 100%;
  min-height: 100vh;

  @media (${props => props.theme.breakpoint}) {
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
  }
`;

const Details = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: 1;
  width: 250px;
  height: 100vh;
  padding: 15px;
  box-sizing: border-box;
  background-color: #e2e2e2;
  color: ${props => props.theme.colors.one};

  @media (${props => props.theme.breakpoint}) {
    position: relative;
    grid-column: 1;
    height: auto;
    margin-bottom: 50px;
    width: 100%;
  }
`;

const Main = styled.main`
  grid-column: 2;
  min-height: 100vh;
  padding: 50px;
  box-sizing: border-box;

  &.empty {
    grid-column: 1 / span 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  @media (${props => props.theme.breakpoint}) {
    grid-column: 1;
    padding-top: 0;
    min-height: auto;
    padding-bottom: 100px;

    &.empty {
      height: 100vh;
    }
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  @media (${props => props.theme.breakpoint}) {
    flex-direction: column;
  }
`;

const Filters = styled.div`
  & span {
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: lighter;
    display: block;
  }
`;

const FilterButton = styled.button`
  background: ${props => props.theme.colors.three};
  border-bottom: 1px solid ${props => props.theme.colors.four};
  padding: 6px 9px;
  color: white;
  border: none;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const Reset = styled.button`
  font-size: 1.1em;
  border: 0;
  background-color: ${props => props.theme.colors.five};
  border-bottom: 1px solid ${props => props.theme.colors.four};
  padding: 10px 25px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: white;
  font-weight: bolder;
  cursor: pointer;

  @media (${props => props.theme.breakpoint}) {
    font-size: 0.8em;
    padding: 8px 15px;
    margin-top: 15px;
  }
`;

const Nothing = styled.div`
  font-weight: 100;
  font-size: 2.5em;
  text-align: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -15px;
    height: 3px;
    background-color: ${props => props.theme.colors.three};
  }

  @media (${props => props.theme.breakpoint}) {
    font-size: 1.4em;
  }
`;

const Total = styled.div`
  font-weight: bolder;
  font-size: 2em;
  padding: 5px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  & span {
    font-size: 0.4em;
    text-transform: uppercase;
    font-weight: lighter;
    display: block;
  }
`;
