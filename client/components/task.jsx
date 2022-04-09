import React from 'react'
import { useDispatch } from 'react-redux'

import { setStatus } from '../redux/reducers/tasks'

const ButtonSingle = ({ category, nextStatus, id }) => {
  const dispatch = useDispatch()
  return (
    <button
      type="button"
      className="p-2 rounded-md bg-neutral-800"
      onClick={() => {
        dispatch(setStatus(category, id, nextStatus))
      }}
    >
      {nextStatus}
    </button>
  )
}

const ButtonGroup = ({ category, nextStatusFirst, nextStatusSecond, id }) => {
  const dispatch = useDispatch()
  return (
    <>
      <button
        type="button"
        className="p-2 rounded-md bg-neutral-800"
        onClick={() => {
          dispatch(setStatus(category, id, nextStatusFirst))
        }}
      >
        {nextStatusFirst}
      </button>
      <button
        type="button"
        className="p-2 rounded-md bg-neutral-800"
        onClick={() => {
          dispatch(setStatus(category, id, nextStatusSecond))
        }}
      >
        {nextStatusSecond}
      </button>
    </>
  )
}

const Task = ({ taskObj, category }) => {
  const NEW = 'new'
  const DONE = 'done'
  const PROGRESS = 'in progress'
  const BLOCKED = 'blocked'

  return (
    <div className="flex flex-col justify-between h-60 w-44 m-1 p-3 text-white text-md font-semibold border-2 border-collapse rounded-3xl bg-emerald-600">
      <p className="flex flex-wrap justify-center">Title: {taskObj.title}</p>
      <p>Status: {taskObj.status}</p>
      <div className="flex flex-wrap items-center justify-around">
        {taskObj.status === NEW && (
          <ButtonSingle nextStatus={PROGRESS} category={category} id={taskObj.taskId} />
        )}
        {taskObj.status === BLOCKED && (
          <ButtonSingle nextStatus={PROGRESS} category={category} id={taskObj.taskId} />
        )}
        {taskObj.status === PROGRESS && (
          <ButtonGroup
            nextStatusFirst={DONE}
            nextStatusSecond={BLOCKED}
            category={category}
            id={taskObj.taskId}
          />
        )}
      </div>
    </div>
  )
}

Task.propTypes = {}

export default Task
