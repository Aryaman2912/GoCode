import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'

import 'codemirror/addon/edit/closebrackets'
import "codemirror/addon/edit/closetag"
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import { Controlled as ControlledEditor } from 'react-codemirror2'

const Editor = (props) => {
  const {
    languageMode,
    code,
    onChange,
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
          tabSize: 2,
          mode: languageMode,
          theme: 'material',
          lineNumbers: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          matchBrackets: true,
        }}
      />      
    </>
  )
}

export default Editor;