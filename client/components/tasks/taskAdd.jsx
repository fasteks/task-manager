import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addTask } from '../../redux/reducers/tasks'

const TaskAdd = ({ category, setActive }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  return (
    <div className="m-3">
      <input
        type="text"
        className="mr-1 p-1"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <button
        type="button"
        className="p-1 text-white"
        onClick={() => {
          if (text.length > 1 && text.trim() !== '') {
            setActive('button-1')
            setText('')
            dispatch(addTask(category, text))
          }
        }}
      >
        Add new Task
      </button>
    </div>
  )
}

TaskAdd.propTypes = {}

export default TaskAdd
