import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Header from './header'
import Head from './head'

import Task from './task'
import TaskAdd from './taskAdd'
import Hidden from './hidden'

import { getTasks } from '../redux/reducers/tasks'

const Tasks = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const [hidden, setHidden] = useState(false)
  const { tasksList } = useSelector((s) => s.tasks)

  useEffect(() => {
    dispatch(getTasks(category))
  }, [category])

  return (
    <div className="min-h-screen min-w-min flex flex-col bg-gray-500">
      <Head title={category} />
      <Header category={category} hidden={hidden} setHidden={setHidden} />
      <div className="min-w-fit my-auto flex items-center justify-center text-center">
        {!hidden && (
          <div className="flex flex-col flex-wrap items-center justify-between p-3 pb-5 border-4 border-emerald-600 bg-neutral-800">
            <TaskAdd category={category} />
            <div className="flex flex-wrap justify-center">
              {tasksList.map((it) => {
                return <Task key={it.taskId} taskObj={it} category={category} />
              })}
            </div>
          </div>
        )}
        {hidden && <Hidden category={category} />}
      </div>
    </div>
  )
}

Tasks.propTypes = {}

export default Tasks
