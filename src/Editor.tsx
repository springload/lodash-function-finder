import React, { useEffect, useState, useRef } from "react";
import "./Editor.css";

type Props = {
  value: string;
  handleValueChanged: Function;
  prefix?: string;
  suffix?: string;
  error?: string;
};

const Editor = ({
  value,
  handleValueChanged,
  prefix,
  suffix,
  error
}: Props) => {
  const refSpan = useRef(null);

  return (
    <div
      className="editor"
      onClick={e => {
        if (!refSpan || !refSpan.current) return;
        refSpan.current.focus();
      }}
    >
      {prefix ? prefix : ""}
      <span
        className="editor__textarea"
        ref={refSpan}
        contentEditable
        onKeyUp={e => {
          if (!refSpan || !refSpan.current) return;
          const newValue = refSpan.current.innerText;
          handleValueChanged(newValue);
        }}
      >
        {value}
      </span>
      {suffix ? suffix : ""}
      {error ? (
        <div aria-live="polite" className="editor__error">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default Editor;
