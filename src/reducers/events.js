const event = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        id: action.id,
        title: action.title
      }
    case 'TOGGLE_EVENT':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        favorite: !state.favorite
      }
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
    case 'TOGGLE_EVENT':
      return state.map(t =>
        event(t, action)
      )
    default:
      return state
  }
}

export default events
