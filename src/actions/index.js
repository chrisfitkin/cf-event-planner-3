let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const toggleEvent = (id) => ({
  type: 'TOGGLE_EVENT',
  id
})


let nextEventId = 0
export const addEvent = (props) => {
  const { title, host, eventType, startDate, startTime, endDate, endTime, location, message, inviteList } = props
  return ({
    type: 'ADD_EVENT',
    id: nextEventId++,
    favorite: false,
    title,
    host,
    eventType,
    startDate,
    startTime,
    endDate,
    endTime,
    location,
    message,
    inviteList
  })
}

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
