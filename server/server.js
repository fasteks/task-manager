import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'

import config from './config'

import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const shortid = require('shortid')

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const setNewTaskObj = (name) => {
  return {
    taskId: shortid.generate(),
    title: name,
    _isDeleted: false, // флаг удален ли таск. Физичически мы таски не удаляем, только помечаем что удален
    _createdAt: +new Date(), // время в секундах от 1,1,1970 до момента создания таска,
    _deletedAt: null, // время в секундах от 1,1,1970 до момента удаление таска или null
    status: 'new' // ['done', 'new', 'in progress', 'blocked'] - может быть только эти значения и никакие больше
  }
}

const readTask = (category) => {
  const tasks = readFile(`${__dirname}/tasks/${category}.json`, 'utf-8')
    .then((text) => {
      return JSON.parse(text)
    })
    .catch(() => [])
  return tasks
}

const calculateTime = (tasks, date) => {
  const day = 86400000
  const week = 604800000
  const month = 18144000000
  let time
  if (date === 'day') time = day
  if (date === 'week') time = week
  if (date === 'month') time = month
  const tasksSortedByTime = tasks.filter((it) => {
    return +new Date() - +it._createdAt <= time
  })
  return tasksSortedByTime
}
server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const tasks = await readTask(category)
  const sortedTasks = tasks.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    if (!rec._isDeleted) {
      delete rec._isDeleted
    }
    return [...acc, rec]
  }, [])
  res.json(sortedTasks)
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const tasks = await readTask(category)
  const tasksSortedByTime = await calculateTime(tasks, timespan)
  const tasksOutput = tasksSortedByTime.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    if (!rec._isDeleted) {
      delete rec._isDeleted
    }
    return [...acc, rec]
  }, [])
  res.json(tasksOutput)
})

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const { title } = req.body
  const tasks = await readTask(category)
  const updatedTasks = [...tasks, setNewTaskObj(title)]
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(updatedTasks), 'utf-8')
  const tasksOutput = updatedTasks.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    if (!rec._isDeleted) {
      delete rec._isDeleted
    }
    return [...acc, rec]
  }, [])
  res.json(tasksOutput)
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const { newStatus } = req.body
  const statusArray = ['done', 'new', 'in progress', 'blocked']
  if (statusArray.indexOf(newStatus) === -1) {
    res.json({ status: 'error', message: 'incorrect status' })
  }
  const tasks = await readTask(category)
  const tasksUpdate = tasks.map((it) => {
    if (it.taskId === id) {
      return { ...it, status: newStatus }
    }
    return it
  })
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(tasksUpdate), 'utf-8')
  const tasksOutput = tasksUpdate.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    if (!rec._isDeleted) {
      delete rec._isDeleted
    }
    return [...acc, rec]
  }, [])
  res.json(tasksOutput)
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const tasks = await readTask(category)
  const tasksDeleted = tasks.map((it) => {
    if (it.taskId === id) {
      return { ...it, _isDeleted: true }
    }
    return it
  })
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(tasksDeleted), 'utf-8')
  const tasksOutput = tasksDeleted.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    if (!rec._isDeleted) {
      delete rec._isDeleted
    }
    return [...acc, rec]
  }, [])
  res.json(tasksOutput)
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
