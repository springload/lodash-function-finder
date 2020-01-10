import React, { useRef } from "react";
import { clamp } from "lodash";
import "./Editor.css";

type Props = {
  value: string;
  handleValueChanged: Function;
  prefix?: string;
  suffix?: string;
  error?: string;
};

const WRAP_AT = 40;

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
      <textarea
        className="editor__textarea"
        ref={refSpan}
        value={value}
        rows={Math.floor(value.length / WRAP_AT) + 1}
        cols={clamp(value.length, 1, WRAP_AT)}
        onChange={e => {
          if (!refSpan || !refSpan.current) return;
          const newValue = e.target.value;
          handleValueChanged(newValue);
        }}
      />
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
