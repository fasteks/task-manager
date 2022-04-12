import axios from 'axios'

const GET_TASKS = '@task-manager/tasks/GET_TASKS'
const SET_STATUS = '@task-manager/tasks/SET_STATUS'
const ADD_TASK = '@task-manager/tasks/ADD_TASK'
const DELETE_TASK = '@task-manager/tasks/DELETE_TASK'
const SET_TITLE = '@task-manager/tasks/SET_TITLE'
const SET_TIMESPAN = '@task-manager/tasks/SET_TIMESPAN'

const initialState = {
  tasksList: [],
  hiddenList: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        tasksList: action.tasksArray,
        hiddenList: action.listOfHidden
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
        tasksList: action.tasksArray,
        hiddenList: action.listOfHidden
      }
    }
    default:
      return state
  }
}

export function getTasks(category) {
  return async (dispatch) => {
    await axios
      .get(`/api/v1/tasks/${category}`)
      .then(({ data }) => {
        dispatch({
          type: GET_TASKS,
          tasksArray: data.sortedTasks,
          listOfHidden: data.tasksOutputHidden
        })
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
        dispatch({
          type: DELETE_TASK,
          tasksArray: data.tasksOutput,
          listOfHidden: data.tasksOutputHidden
        })
      })
      .catch((err) => err)
  }
}
