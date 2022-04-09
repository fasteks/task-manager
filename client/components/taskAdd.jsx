import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addTask } from '../redux/reducers/tasks'

const TaskAdd = ({ category }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  return (
    <div className="flex p-5">
      <input
        type="text"
        className="mr-2 px-1"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <button
        type="button"
        className="px-1 text-white"
        onClick={() => {
          if (text.length > 1) {
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
