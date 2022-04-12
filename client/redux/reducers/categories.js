import axios from 'axios'

const GET_CATEGORIES = '@task-manager/tasks/GET_CATEGORIES'
const ADD_CATEGORY = '@task-manager/tasks/ADD_CATEGORY'
const DELETE_CATEGORY = '@task-manager/tasks/DELETE_CATEGORY'

const initialState = {
  categoriesList: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return {
        ...state,
        categoriesList: action.categoriesArray
      }
    }
    case ADD_CATEGORY: {
      return {
        ...state,
        categoriesList: action.categoriesArray
      }
    }
    case DELETE_CATEGORY: {
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

export function deleteCategory(category) {
  return async (dispatch) => {
    await axios({
      method: 'delete',
      url: `/api/v1/${category}`
    })
      .then(({ data }) => {
        dispatch({ type: DELETE_CATEGORY, categoriesArray: data })
      })
      .catch((err) => err)
  }
}
