import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckSquare, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { changeTitle, deleteTask } from '../../redux/reducers/tasks'

import TaskButton from './taskButton'

const Task = ({ taskObj, category }) => {
  const dispatch = useDispatch()
  const [insert, setInsert] = useState(false)
  const [text, setText] = useState('')
  const NEW = 'new'
  const DONE = 'done'
  const PROGRESS = 'in progress'
  const BLOCKED = 'blocked'
  return (
    <div className="min-w-min flex flex-col justify-between h-52 w-48 m-1 p-3 text-white text-md font-semibold border-2 border-collapse rounded-3xl bg-emerald-600">
      <div className="flex flex-wrap items-center justify-between">
        <p className="p-0.5 text-black rounded-md bg-white">{taskObj.status}</p>
        <div className="flex flex-wrap items-center">
          {!insert && (
            <button
              type="button"
              className="text-black"
              onClick={() => {
                setInsert(!insert)
                setText(taskObj.title)
              }}
            >
              <FontAwesomeIcon icon={faEdit} className="p-1 text-2xl" />
            </button>
          )}
          {insert && (
            <button
              type="button"
              className="text-black"
              onClick={() => {
                setInsert(!insert)
                dispatch(changeTitle(category, taskObj.taskId, text))
              }}
            >
              <FontAwesomeIcon icon={faCheckSquare} className="p-1 text-2xl" />
            </button>
          )}
          <button
            type="button"
            className="ml-0.5 text-black"
            onClick={() => {
              dispatch(deleteTask(category, taskObj.taskId))
            }}
          >
            <FontAwesomeIcon icon={faEyeSlash} className="p-1 text-2xl" />
          </button>
        </div>
      </div>
      {!insert && <span className="flex justify-center truncate text-lg">{taskObj.title}</span>}
      {insert && (
        <input
          className="w-full text-black text-lg"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
      )}
      <div className="flex flex-wrap items-center justify-around">
        {taskObj.status === NEW && (
          <TaskButton nextStatus={PROGRESS} category={category} id={taskObj.taskId} />
        )}
        {taskObj.status === BLOCKED && (
          <TaskButton nextStatus={PROGRESS} category={category} id={taskObj.taskId} />
        )}
        {taskObj.status === PROGRESS && (
          <TaskButton nextStatus={DONE} category={category} id={taskObj.taskId} />
        )}
        {taskObj.status === PROGRESS && (
          <TaskButton nextStatus={BLOCKED} category={category} id={taskObj.taskId} />
        )}
      </div>
    </div>
  )
}

Task.propTypes = {}

export default Task
