import axios from 'axios'

const GET_CATEGORIES = '@task-manager/tasks/GET_CATEGORIES'
const GET_TASKS = '@task-manager/tasks/GET_TASKS'
const SET_STATUS = '@task-manager/tasks/SET_STATUS'
const ADD_TASK = '@task-manager/tasks/ADD_TASK'
const ADD_CATEGORY = '@task-manager/tasks/ADD_CATEGORY'
const DELETE_TASK = '@task-manager/tasks/DELETE_TASK'
const SET_TITLE = '@task-manager/tasks/SET_TITLE'
const SET_TIMESPAN = '@task-manager/tasks/SET_TIMESPAN'

const initialState = {
  categoriesList: [],
  tasksList: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return {
        ...state,
        categoriesList: action.categoriesArray
      }
    }
    case GET_TASKS: {
      return {
        ...state,
        tasksList: action.tasksArray
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        tasksList: action.tasksArray
      }
    }
    case ADD_TASK: {
      return {
        ...state,
        tasksList: action.tasksArray
      }
    }
    case SET_TITLE: {
      return {
        ...state,
        tasksList: action.tasksArray
      }
    }
    case SET_TIMESPAN: {
      return {
        ...state,
        tasksList: action.tasksArray
      }
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasksList: action.tasksArray
      }
    }
    case ADD_CATEGORY: {
      return {
        ...state,
        categoriesList: action.categoriesArray
      }
    }
    default:
      return state
  }
}

export function getCategories() {
  return async (dispatch) => {
    await axios
      .get('/api/v1/categories')
      .then(({ data }) => {
        dispatch({ type: GET_CATEGORIES, categoriesArray: data })
      })
      .catch((err) => err)
  }
}

export function getTasks(category) {
  return async (dispatch) => {
    await axios
      .get(`/api/v1/tasks/${category}`)
      .then(({ data }) => {
        dispatch({ type: GET_TASKS, tasksArray: data })
      })
      .catch((err) => err)
  }
}

export function setStatus(category, id, nextStatus) {
  return async (dispatch) => {
    await axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}/${id}`,
      data: {
        setStatus: nextStatus
      }
    })
      .then(({ data }) => {
        if (typeof data.length !== 'undefined') {
          dispatch({ type: SET_STATUS, tasksArray: data })
        }
      })
      .catch((err) => err)
  }
}

export function addTask(category, newTask) {
  return async (dispatch) => {
    await axios({
      method: 'post',
      url: `/api/v1/tasks/${category}`,
      data: {
        addTask: newTask
      }
    })
      .then(({ data }) => {
        dispatch({ type: ADD_TASK, tasksArray: data })
      })
      .catch((err) => err)
  }
}

export function changeTitle(category, id, newTitle) {
  return async (dispatch) => {
    await axios({
      method: 'patch',
      url: `/api/v1/tasks/${category}`,
      data: {
        currentId: id,
        setTitle: newTitle
      }
    })
      .then(({ data }) => {
        dispatch({ type: SET_TITLE, tasksArray: data })
      })
      .catch((err) => err)
  }
}

export function setTimespan(category, timespan) {
  return async (dispatch) => {
    await axios({
      method: 'get',
      url: `/api/v1/tasks/${category}/${timespan}`
    })
      .then(({ data }) => {
        dispatch({ type: SET_TIMESPAN, tasksArray: data })
      })
      .catch((err) => err)
  }
}

export function deleteTask(category, id) {
  return async (dispatch) => {
    await axios({
      method: 'delete',
      url: `/api/v1/tasks/${category}/${id}`
    })
      .then(({ data }) => {
        dispatch({ type: DELETE_TASK, tasksArray: data })
      })
      .catch((err) => err)
  }
}

export function addCategory(category) {
  return async (dispatch) => {
    await axios({
      method: 'post',
      url: '/api/v1/categories',
      data: {
        category
      }
    })
      .then(({ data }) => {
        dispatch({ type: ADD_CATEGORY, categoriesArray: data })
      })
      .catch((err) => err)
  }
}

// server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
//   const { category, timespan } = req.params
//   const tasks = await readTask(category)
//   const tasksSortedByTime = await calculateTime(tasks, timespan)
//   const tasksOutput = tasksSortedByTime.reduce((acc, rec) => {
//     delete rec._createdAt
//     delete rec._deletedAt
//     if (!rec._isDeleted) {
//       delete rec._isDeleted
//     }
//     return [...acc, rec]
//   }, [])
//   res.json(tasksOutput)
// })

// export const DAY = 'day'
// export const WEEK = 'week'
// export const MONTH = 'month'
// export const CENTURY = 'century'
// export const DAY_MS = 1000 * 60 * 60 * 24
// export const WEEK_MS = 1000 * 60 * 60 * 24 * 7
// export const MONTH_MS = 1000 * 60 * 60 * 24 * 30
// export const CENTURY_MS = 1000 * 60 * 60 * 24 * 365 * 100

// const calculateTime = (tasks, date) => {
//   let time
//   if (date === DAY) time = DAY_MS
//   if (date === WEEK) time = WEEK_MS
//   if (date === MONTH) time = MONTH_MS
//   if (date === CENTURY) time = CENTURY_MS
//   const tasksSortedByTime = tasks.filter((it) => {
//     return +new Date() - +it._createdAt <= time
//   })
//   return tasksSortedByTime
// }

// const calculateTime = (tasks, date) => {
//   const day = 1000 * 60 * 60 * 24
//   const week = 1000 * 60 * 60 * 24 * 7
//   const month = 1000 * 60 * 60 * 24 * 30
//   const all = 1000 * 60 * 60 * 24 * 365 * 100
//   let time
//   if (date === 'all') time = all
//   if (date === 'day') time = day
//   if (date === 'week') time = week
//   if (date === 'month') time = month
//   const tasksSortedByTime = tasks.filter((it) => {
//     return +new Date() - +it._createdAt <= time
//   })
//   return tasksSortedByTime
// }

// const calculateTime = (tasks, date) => {
//   const day = 1000 * 60 * 60 * 24
//   const week = 1000 * 60 * 60 * 24 * 7
//   const month = 1000 * 60 * 60 * 24 * 30
//   let time
//   if (date === 'day') time = day
//   if (date === 'week') time = week
//   if (date === 'month') time = month
//   const tasksSortedByTime = tasks.filter((it) => {
//     return +new Date() - +it._createdAt <= time
//   })
//   return tasksSortedByTime
// }
