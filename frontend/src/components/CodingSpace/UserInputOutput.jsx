import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import { Controlled as ControlledEditor } from 'react-codemirror2'

const UserInputOutput = (props) => {
  const {
    text,
    onChange,
    isInput
  } = props

  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={text}
        className="code-mirror-wrapper"
        options = {{
          lineWrapping: true,
          lint: true,
          theme: 'material',
          lineNumbers: true,
          readOnly: !isInput
        }}
      />
    </>
  )
}

export default UserInputOutput;