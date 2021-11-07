import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import { Controlled as ControlledEditor } from 'react-codemirror2'

const ViewCode = (props) => {
  const {
    languageMode,
    code,
  } = props

  return (
    <>
      <ControlledEditor
        value={code}
        className="code-mirror-wrapper"
        options = {{
          lineWrapping: true,
          lint: true,
          mode: languageMode,
          theme: 'material',
          lineNumbers: true,
          readOnly: true
        }}
      />
    </>
  )
}

export default ViewCode;