import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "../styles/components/tagNoteInput.module.css";

const tokenAtCursor = (text, cursorPos) => {
  let start = cursorPos;
  while (start > 0 && !/\s/.test(text[start - 1])) start--;
  let end = cursorPos;
  while (end < text.length && !/\s/.test(text[end])) end++;
  return { start, end, token: text.slice(start, end) };
};

const TagNoteInput = React.forwardRef(function TagNoteInput(
  {
    value,
    onChange,
    allTags,
    className,
    wrapperClassName,
    placeholder,
    autoFocus,
    "aria-label": ariaLabel,
  },
  forwardedRef
) {
  const inputRef = useRef(null);
  const [cursorPos, setCursorPos] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [pendingCursor, setPendingCursor] = useState(null);

  const setRefs = useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef && "current" in forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );

  useEffect(() => {
    if (pendingCursor != null && inputRef.current) {
      inputRef.current.setSelectionRange(pendingCursor, pendingCursor);
      setPendingCursor(null);
    }
  }, [pendingCursor]);

  const { start, end, token } = useMemo(
    () => tokenAtCursor(value || "", cursorPos),
    [value, cursorPos]
  );

  const suggestions = useMemo(() => {
    if (!isFocused) return [];
    if (!token.startsWith("#") || token.length < 2) return [];
    const needle = token.toLowerCase();
    return allTags
      .filter((t) => t !== needle && t.startsWith(needle))
      .slice(0, 8);
  }, [isFocused, token, allTags]);

  useEffect(() => {
    if (highlightIndex >= suggestions.length) setHighlightIndex(0);
  }, [suggestions.length, highlightIndex]);

  const applySuggestion = (tag) => {
    const before = (value || "").slice(0, start);
    const after = (value || "").slice(end);
    const needsSpace = after.length === 0 || !/^\s/.test(after);
    const replacement = tag + (needsSpace ? " " : "");
    const next = before + replacement + after;
    const newCursor = before.length + replacement.length;
    onChange(next);
    setPendingCursor(newCursor);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(
        (i) => (i - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Tab" || (e.key === "Enter" && suggestions.length)) {
      if (e.key === "Enter" && !isFocused) return;
      e.preventDefault();
      applySuggestion(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsFocused(false);
      e.stopPropagation();
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    setCursorPos(e.target.selectionStart ?? e.target.value.length);
    setHighlightIndex(0);
  };

  const handleSelect = (e) => {
    setCursorPos(e.target.selectionStart ?? 0);
  };

  return (
    <div className={`${styles.wrap} ${wrapperClassName || ""}`.trim()}>
      <input
        type="text"
        ref={setRefs}
        className={className}
        value={value || ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSelect={handleSelect}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 120)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul
          className={styles.list}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
        >
          {suggestions.map((tag, i) => (
            <li
              key={tag}
              role="option"
              aria-selected={i === highlightIndex}
              className={`${styles.item} ${i === highlightIndex ? styles.itemActive : ""}`.trim()}
              onMouseEnter={() => setHighlightIndex(i)}
              onClick={() => applySuggestion(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

TagNoteInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  "aria-label": PropTypes.string,
};

export default TagNoteInput;
