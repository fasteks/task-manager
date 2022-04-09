import axios from 'axios'

const GET_TASKS = '@task-manager/tasks/GET_TASKS'

const initialState = {
  categoriesList: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TASKS: {
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
        dispatch({ type: GET_TASKS, categoriesArray: data })
      })
      .catch((err) => err)
  }
}
