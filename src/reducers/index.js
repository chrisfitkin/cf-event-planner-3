import { combineReducers } from 'redux'
import todos from './todos'
import register from './register'
import events from './events'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  register,
  events,
  visibilityFilter
})

export default todoApp
