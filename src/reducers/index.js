// import { combineReducers } from 'redux'
import todos from './todos'
import addEventStepper from './addEventStepper'
import form from './form'
import events from './events'
import visibilityFilter from './visibilityFilter'

const eventsApp = {
  todos,
  form,
  addEventStepper,
  events,
  visibilityFilter
}

export default eventsApp
