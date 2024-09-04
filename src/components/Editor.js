import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'


export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange,
  } = props;
  const [open,setOpen] = useState(true)


  const extensions = [];
  if (language === 'html') extensions.push(html());
  if (language === 'css') extensions.push(css());
  if (language === 'javascript') extensions.push(javascript());


  function handleChange(value) {
    onChange(value);
  }


  return (
    <div className ={`codeeditor-container ${open ? '' : 'collapsed'}`}>
      <div className="codeeditor-title">
        {displayName}
        <button  
         type="button"
         className="expand-collapse-btn"
         onClick = {() => setOpen(prevOpen => !prevOpen)}>
        <FontAwesomeIcon icon = {open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <CodeMirror
        value={value}
        extensions={extensions}
        theme={oneDark}
        onChange={handleChange}
        className="code-mirror-wrapper"
      />
    </div>
  );
}


