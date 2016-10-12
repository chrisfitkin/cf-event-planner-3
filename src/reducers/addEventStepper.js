const addEventStepper = (state = {stepIndex: 0}, action) => {
  switch (action.type) {
    case 'ADD_EVENT_NEXT':
      // console.log(action.values)
      // console.log('next step')
      return {stepIndex: state.stepIndex + 1}
    case 'ADD_EVENT_PREV':
      return {stepIndex: state.stepIndex - 1}
    case 'ADD_EVENT_RESET':
      return {stepIndex: 0}
    default:
      return state
  }
}

export default addEventStepper
