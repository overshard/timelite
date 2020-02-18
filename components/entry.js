import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useForm from "react-hook-form";
import PropTypes from "prop-types";

import { timeString } from "../utils/time";
import { Context } from "../components/context";

const Entry = ({ entry, removeEntry, isSelected }) => {
  const { state, dispatch } = useContext(Context);
  const { register, handleSubmit } = useForm();
  const themeContext = useContext(ThemeContext);

  const onSubmit = data => {
    dispatch({
      type: "EDIT_LOG",
      entry: {
        ...entry,
        note: data.note,
        tags: data.note
          .split(" ")
          .filter(word => word.startsWith("#"))
          .map(word => {
            return word.toLowerCase();
          })
      }
    });
    dispatch({type:"LOG_EDIT", edit:false});
  };

  const higlight =
    isSelected == entry.id
      ? {
          backgroundColor: themeContext.colors.five
        }
      : {};
  return (
    <EntryContainer style={higlight} className={state.edit && "zoom"}>
      {(state.edit && isSelected==entry.id) ? (
        <EntryForm onSubmit={handleSubmit(onSubmit)}>
          <EntryTime>
            {timeString(entry.end - entry.start)}
            <span>{entry.start.toLocaleTimeString()}</span>
          </EntryTime>
          <EntryNote>
            <EntryNoteInput
              name="note"
              defaultValue={entry.note}
              ref={register}
              autoFocus
            />
          </EntryNote>
          <EntrySubmit type="submit">✔</EntrySubmit>
          <EntryRemove type="button" onClick={() =>  dispatch({type:"LOG_EDIT", edit:false})}>
            x
          </EntryRemove>
        </EntryForm>
      ) : (
        <>
          <EntryTime>
            {timeString(entry.end - entry.start)}
            <span>{entry.start.toLocaleTimeString()}</span>
          </EntryTime>
          <EntryNote className={entry.note.length === 0 && "empty"}>
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
          <EntryEdit
            onClick={() => {
              dispatch({ type: "SELECT_LOG_ITEM", id: entry.id });
              dispatch({type:"LOG_EDIT", edit:true})
            }}
          >
            _
          </EntryEdit>
          <EntryRemove
            onClick={() => {
              dispatch({ type: "SELECT_LOG_ITEM", id: "" });
              removeEntry(entry.id);
            }}
          >
            x
          </EntryRemove>
        </>
      )}
    </EntryContainer>
  );
};

Entry.propTypes = {
  entry: PropTypes.object,
  removeEntry: PropTypes.func
};

export default Entry;

const EntryContainer = styled.div`
  background-color: #ffffff;
  color: black;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 150px 1fr 50px 50px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.four};
  transition-duration: 250ms;
  transition-property: transform;

  &.zoom {
    transform: scale(1.05);
  }

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
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    text-align: center;
  }
`;

const EntryForm = styled.form`
  display: contents;
`;

const EntryNoteInput = styled.input`
  border: none;
  padding: 12px 0;
  font-size: 1em;
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.colors.three};
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
  flex-direction: column;

  @media (${props => props.theme.breakpoint}) {
    grid-column: 1 / span 2;
  }

  span {
    font-size: 0.7em;
    opacity: 0.8;
    font-weight: lighter;
  }
`;

const EntryNote = styled.div`
  padding: 15px;

  &.empty {
    padding: 0;
  }

  & small {
    display: block;
    color: gray;
    margin-top: 5px;
  }

  @media (${props => props.theme.breakpoint}) {
    grid-column: 1 / span 2;
  }
`;

const EntryEdit = styled.button`
  font-size: 1.3em;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  border: 0;
  background: ${props => props.theme.colors.four};
  margin: 0;
  padding: 15px;
  height: 100%;

  @media (${props => props.theme.breakpoint}) {
    padding: 5px;
  }
`;

const EntrySubmit = styled.button`
  font-size: 1.3em;
  font-weight: bolder;
  color: white;
  cursor: pointer;
  border: 0;
  background: ${props => props.theme.colors.four};
  margin: 0;
  padding: 15px;
  height: 100%;

  @media (${props => props.theme.breakpoint}) {
    padding: 5px;
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
