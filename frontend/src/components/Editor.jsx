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
    language,
    code,
    onChange,
    handleSubmit
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
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      />
      <Button variant="primary" onClick={handleSubmit}>Test</Button>{' '}
      <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
      
    </>
  )
}

export default Editor;