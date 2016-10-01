const event = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        id: action.id,
        title: action.title
      }
    // case 'TOGGLE_TODO':
    //   if (state.id !== action.id) {
    //     return state
    //   }
    //
    //   return {
    //     ...state,
    //     completed: !state.completed
    //   }
    default:
      return state
  }
}

const events = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [
        ...state,
        event(undefined, action)
      ]
    // case 'TOGGLE_TODO':
    //   return state.map(t =>
    //     todo(t, action)
    //   )
    default:
      return state
  }
}

export default events
