import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Header from './header'
import Head from './head'

import { getTasks } from '../redux/reducers/tasks'
import Task from './task'
import TaskAdd from './taskAdd'

const Tasks = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const { tasksList } = useSelector((s) => s.tasks)

  useEffect(() => {
    dispatch(getTasks(category))
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Head title={category} />
      <Header category={category} />
      <div className="flex items-center justify-center text-center bg-contain bg-gray-500">
        <div className="flex flex-col flex-wrap items-center justify-between p-5 border-4 border-emerald-600 bg-neutral-800">
          <TaskAdd category={category} />
          <div className="flex flex-wrap justify-center">
            {tasksList.map((it) => {
              return <Task key={it.taskId} taskObj={it} category={category} />
            })}
          </div>
          <TaskAdd category={category} />
        </div>
      </div>
    </div>
  )
}

Tasks.propTypes = {}

export default Tasks
