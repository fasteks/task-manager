import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'

import config from './config'

import Html from '../client/html'

const { readFile, writeFile, readdir, unlink } = require('fs').promises

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
  return readFile(`${__dirname}/tasks/${category}.json`, 'utf-8')
    .then((text) => {
      return JSON.parse(text)
    })
    .catch(() => [])
}

const calculateTime = (tasks, date) => {
  const timespanObj = {
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 365 * 30,
    century: 1000 * 60 * 60 * 24 * 365 * 100
  }
  return tasks.filter((it) => {
    return +new Date() - +it._createdAt <= timespanObj[date]
    // return +it._createdAt + +timespanObj[date] > +new Date()
  })
}

server.get('/api/v1/categories', async (req, res) => {
  const tasksCategories = await readdir(`${__dirname}/tasks/`, (err, files) => files)
  const slicedCategories = tasksCategories.map((it) => it.slice(0, it.indexOf('.')))
  res.json(slicedCategories)
})

server.post('/api/v1/categories', async (req, res) => {
  const { category } = req.body
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify([]), 'utf-8')
  const tasksCategories = await readdir(`${__dirname}/tasks/`, (err, files) => files)
  const slicedCategories = tasksCategories.map((it) => it.slice(0, it.indexOf('.')))
  res.json(slicedCategories)
})

server.delete('/api/v1/:category', async (req, res) => {
  const { category } = req.params
  const tasksCategories = await readdir(`${__dirname}/tasks/`, (err, files) => files)
  tasksCategories.forEach(async (it) => {
    if (it === `${category}.json`) {
      await unlink(`${__dirname}/tasks/${it}`)
    }
  })
  const categories = await readdir(`${__dirname}/tasks/`, (err, files) => files)
  const slicedCategories = categories.map((it) => it.slice(0, it.indexOf('.')))
  res.json(slicedCategories)
})

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const tasks = await readTask(category)
  const sortingFromDeleted = tasks.filter((it) => !it._isDeleted)
  const sortedTasks = sortingFromDeleted.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  const sortingFromDeletedHidden = tasks.filter((it) => it._isDeleted)
  const tasksOutputHidden = sortingFromDeletedHidden.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  const data = {
    sortedTasks,
    tasksOutputHidden
  }
  res.json(data)
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const tasks = await readTask(category)
  const tasksSortedByTime = await calculateTime(tasks, timespan)
  const sortingFromDeleted = tasksSortedByTime.filter((it) => !it._isDeleted)
  const tasksOutput = sortingFromDeleted.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  return res.json(tasksOutput)
})

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const { addTask } = req.body
  const tasks = await readTask(category)
  const updatedTasks = [...tasks, setNewTaskObj(addTask)]
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(updatedTasks), 'utf-8')
  const sortingFromDeleted = updatedTasks.filter((it) => !it._isDeleted)
  const tasksOutput = sortingFromDeleted.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  res.json(tasksOutput)
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const { setStatus } = req.body
  const statusArray = ['done', 'new', 'in progress', 'blocked']
  if (!statusArray.includes(setStatus)) {
    return res.json({ status: 'error', message: 'incorrect status' })
  }
  const tasks = await readTask(category)
  const tasksUpdate = tasks.map((it) => {
    if (it.taskId === id) {
      return { ...it, status: setStatus }
    }
    return it
  })
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(tasksUpdate), 'utf-8')
  const sortingFromDeleted = tasksUpdate.filter((it) => !it._isDeleted)
  const tasksOutput = sortingFromDeleted.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  return res.json(tasksOutput)
})

server.patch('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const { setTitle, currentId } = req.body
  const tasks = await readTask(category)
  const tasksUpdate = tasks.map((it) => {
    if (it.taskId === currentId) {
      return { ...it, title: setTitle }
    }
    return it
  })
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(tasksUpdate), 'utf-8')
  const sortingFromDeleted = tasksUpdate.filter((it) => !it._isDeleted)
  const tasksOutput = sortingFromDeleted.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  return res.json(tasksOutput)
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const tasks = await readTask(category)
  const tasksDeleted = tasks.map((it) => {
    if (it.taskId === id) {
      return { ...it, _isDeleted: !it._isDeleted }
    }
    return it
  })
  await writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(tasksDeleted), 'utf-8')
  const sortingFromDeleted = tasksDeleted.filter((it) => !it._isDeleted)
  const tasksOutput = sortingFromDeleted.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  const sortingFromDeletedHidden = tasksDeleted.filter((it) => it._isDeleted)
  const tasksOutputHidden = sortingFromDeletedHidden.reduce((acc, rec) => {
    delete rec._createdAt
    delete rec._deletedAt
    delete rec._isDeleted
    return [...acc, rec]
  }, [])
  const data = {
    tasksOutput,
    tasksOutputHidden
  }
  res.json(data)
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
