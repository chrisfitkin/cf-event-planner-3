import { reducer as reduxFormReducer } from 'redux-form'
const thisForm = reduxFormReducer

const formWithNewAction = (state = {}, action) => {
  console.log(action.type)
  console.log(state)
  switch (action.type) {
    case 'FORM_INVALIDATE':
        return state
    default:
      return state
  }
}



export default thisForm // mounted under "form"
