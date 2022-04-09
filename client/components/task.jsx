import React, { useEffect } from 'react'

const Task = ({ taskObj }) => {
  useEffect(() => {}, [])

  return (
    <div className="flex flex-col m-1 p-3 text-white text-md font-semibold border-2 border-collapse rounded-3xl bg-emerald-400">
      <p>Title: {taskObj.title}</p>
      <p>Status: {taskObj.status}</p>
    </div>
  )
}

Task.propTypes = {}

export default Task
