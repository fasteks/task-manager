import React, { useState } from 'react'

const TaskAdd = () => {
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
      <button type="button" className="px-1 text-white">
        Add new Task
      </button>
    </div>
  )
}

TaskAdd.propTypes = {}

export default TaskAdd
