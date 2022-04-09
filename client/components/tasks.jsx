import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Header from './header'
import Head from './head'

import { getTasks } from '../redux/reducers/tasks'
import Task from './task'

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
      <Header />
      <div className="flex items-center justify-center h-full text-center bg-contain bg-gray-500">
        <div className="flex items-center flex-wrap justify-center p-5 border-4 border-emerald-400 rounded-3xl bg-neutral-800">
          {tasksList.map((it) => {
            return <Task key={it.taskId} taskObj={it} />
          })}
        </div>
      </div>
    </div>
  )
}

Tasks.propTypes = {}

export default Tasks
