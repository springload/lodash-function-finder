import React, { useState, useRef } from "react";
import "./Editor.css";

type Props = {
  defaultValue: string;
  handleValueChanged: Function;
  prefix?: string;
  suffix?: string;
};

const Editor = ({
  defaultValue,
  handleValueChanged,
  prefix,
  suffix
}: Props) => {
  const [value] = useState<string>(defaultValue);
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
    </div>
  );
};

export default Editor;
