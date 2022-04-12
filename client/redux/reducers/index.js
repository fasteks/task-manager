import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import tasks from './tasks'
import categories from './categories'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    tasks,
    categories
  })

export default createRootReducer
