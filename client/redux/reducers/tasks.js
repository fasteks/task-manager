import axios from 'axios'

const GET_CATEGORIES = '@task-manager/tasks/GET_CATEGORIES'
const GET_TASKS = '@task-manager/tasks/GET_TASKS'
const SET_STATUS = '@task-manager/tasks/SET_STATUS'
const ADD_TASK = '@task-manager/tasks/ADD_TASK'
const SET_TITLE = '@task-manager/tasks/SET_TITLE'

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
