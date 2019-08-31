import React, { useContext, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

import Page from "../components/page";
import { Context } from "../components/context";
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

  return (
    <Page title="Log">
      <Grid>
        <Details>
          {state.log.length > 0 && (
            <>
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
            </>
          )}
        </Details>
        <Main>
          {getTags(state.log).length > 0 && (
            <Filters>
              <span>Tags</span>
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
                Show All
              </FilterButton>
            </Filters>
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
                      >
                        <EntryTime>
                          {timeString(entry.end - entry.start)}
                        </EntryTime>
                        <EntryNote>
                          {entry.note}
                          {entry.tags.length > 0 && (
                            <small>
                              {entry.tags
                                .map(tag => {
                                  return tag;
                                })
                                .join(", ")}
                            </small>
                          )}
                        </EntryNote>
                        <EntryRemove
                          onClick={() => {
                            dispatch({ type: "REMOVE_LOG", id: entry.id });
                          }}
                        >
                          x
                        </EntryRemove>
                      </Entry>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
              <BottomBar>
                <Reset onClick={() => dispatch({ type: "RESET_LOG" })}>
                  {strings.clear}
                </Reset>
              </BottomBar>
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
  grid-template-columns: 30% 70%;
  width: 100%;
  height: 100vh;

  @media (${props => props.theme.breakpoint}) {
    grid-template-columns: 100%;
    grid-auto-rows: min-content;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: 1;
  min-height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  background-color: #e2e2e2;
  color: ${props => props.theme.colors.one};

  @media (${props => props.theme.breakpoint}) {
    grid-column: 1;
    min-height: auto;
    margin-bottom: 50px;
  }
`;

const Main = styled.main`
  grid-column: 2;
  min-height: 100vh;
  padding: 50px;
  box-sizing: border-box;

  @media (${props => props.theme.breakpoint}) {
    grid-column: 1;
    padding-top: 0;
  }
`;

const Filters = styled.div`
  margin-bottom: 40px;

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

const Entry = styled.div`
  background-color: #ffffff;
  color: black;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 150px 1fr 50px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.four};

  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    transform: translateX(-100px);
  }

  &.fade-appear-active,
  &.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition-duration: 250ms;
    transition-property: opacity, transform;
  }

  &.fade-exit {
    opacity: 1;
    transform: translateX(0);
  }

  &.fade-exit-active {
    opacity: 0;
    transition-delay: 0ms !important;
    transition-duration: 250ms;
    transition-property: opacity, transform;
    transform: translateX(100px);
  }

  @media (${props => props.theme.breakpoint}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    text-align: center;
  }
`;

const EntryTime = styled.div`
  font-weight: bold;
  font-size: 1.3em;
  padding: 15px;
  height: 100%;
  background-color: ${props => props.theme.colors.four};
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const EntryNote = styled.div`
  padding: 15px;

  & small {
    display: block;
    color: gray;
    margin-top: 5px;
  }
`;

const EntryRemove = styled.button`
  font-size: 1.3em;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  border: 0;
  background: ${props => props.theme.colors.five};
  margin: 0;
  padding: 15px;
  height: 100%;

  @media (${props => props.theme.breakpoint}) {
    padding: 5px;
  }
`;

const Nothing = styled.div`
  text-align: center;
  opacity: 0.5;
  font-size: 2em;

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

const BottomBar = styled.div`
  text-align: right;
`;

const Reset = styled.button`
  font-size: 1.1em;
  border: 0;
  background-color: ${props => props.theme.colors.five};
  border-bottom: 1px solid ${props => props.theme.colors.four};
  padding: 10px 25px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 30px;
  color: white;
  font-weight: bolder;
  cursor: pointer;

  @media (${props => props.theme.breakpoint}) {
    font-size: 1em;
    padding: 8px 15px;
  }
`;
