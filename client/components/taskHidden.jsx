import React from 'react'
import { useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import { deleteTask } from '../redux/reducers/tasks'

const TaskHidden = ({ taskObj, category }) => {
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col h-52 w-44 m-1 p-3 text-white text-md font-semibold border-2 border-collapse rounded-3xl bg-red-900">
      <div className="flex flex-wrap justify-end">
        <button
          type="button"
          className="ml-0.5 text-green-400"
          onClick={() => {
            dispatch(deleteTask(category, taskObj.taskId))
          }}
        >
          <FontAwesomeIcon icon={faEye} className="p-1 text-2xl" />
        </button>
      </div>
      <p className="flex flex-wrap justify-center mt-10 text-lg">{taskObj.title}</p>
    </div>
  )
}

TaskHidden.propTypes = {}

export default TaskHidden
