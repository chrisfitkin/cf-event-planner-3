import { combineReducers } from 'redux'
import todos from './todos'
import events from './events'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  events,
  visibilityFilter
})

export default todoApp
