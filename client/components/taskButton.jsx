import React from 'react'
import { useDispatch } from 'react-redux'

import { setStatus } from '../redux/reducers/tasks'

const TaskButton = ({ category, nextStatus, id }) => {
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      className="p-0.5 rounded-md bg-neutral-800"
      onClick={() => {
        dispatch(setStatus(category, id, nextStatus))
      }}
    >
      {nextStatus}
    </button>
  )
}

TaskButton.propTypes = {}

export default TaskButton
