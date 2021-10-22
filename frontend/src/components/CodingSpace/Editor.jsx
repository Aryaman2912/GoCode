import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { Button } from 'react-bootstrap';

const Editor = (props) => {
  const {
    languageMode,
    code,
    onChange,
    buttonHandlerIDE
  } = props

  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={code}
        className="code-mirror-wrapper"
        options = {{
          lineWrapping: true,
          lint: true,
          mode: languageMode,
          theme: 'material',
          lineNumbers: true
        }}
      />
      <Button variant="primary" onClick={() => buttonHandlerIDE("test")}>Test</Button>{' '}
      <Button variant="primary" onClick={() => buttonHandlerIDE("submit")}>Submit</Button>{' '}
      
    </>
  )
}

export default Editor;