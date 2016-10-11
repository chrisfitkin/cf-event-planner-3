import { connect } from 'react-redux'
import { addEvent, addEventStepNext, addEventStepPrev } from '../actions'
import AddEventForm from '../components/AddEventForm'
import { browserHistory } from 'react-router'

const mapStateToProps = (state) => {
  // console.log("------ state ------")
  // console.log(state)
  // return ({
  //   events: getVisibleEvents(state.events, state.visibilityFilter)
  // })
  // let errors = state.form.addEventForm.syncErrors || []

  let errors = []
  let fields = []
  if (state.form && state.form.addEventForm && state.form.addEventForm.syncErrors) {
    errors = state.form.addEventForm.syncErrors
  }
  if (state.form && state.form.addEventForm && state.form.addEventForm.fields) {
    fields = state.form.addEventForm.fields
  }
  return ({
    stepIndex: state.addEventStepper.stepIndex,
    errors: errors,
    fields: fields
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleAddEventSubmit: (values) => {
    // console.log(values)
    // console.log(ownProps)
    dispatch(addEventStepNext(values))
    // dispatch(addEvent(values))
    // browserHistory.push('/')
  },
  handlePrev: () => {
    dispatch(addEventStepPrev())
  },
  dispatch
})

const AddEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventForm)

export default AddEventContainer
