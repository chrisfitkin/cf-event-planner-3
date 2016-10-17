import { connect } from 'react-redux'
import { addEvent, addEventStepNext, addEventStepPrev, addEventStepReset } from '../actions'
import AddEventForm from '../components/AddEventForm'
import { browserHistory } from 'react-router'
import { stopSubmit, reset, startSubmit, SubmissionError, blur } from 'redux-form'

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

const mapDispatchToProps = (dispatch, ownProps, state) => ({
  // errors = state.form.addEventForm.syncErrors
  handleCustomOnBlur: (event, field) => {
    // blur('addEventForm', field, value, touch)
    dispatch(blur('addEventForm', field, undefined, true))
    console.log('---------- handleCustomOnBlur ---------')
    console.log(event)
    console.log(ownProps)
    console.log(state)
  },
  handleCustomOnChange: (event) => {
    console.log('---------- handleCustomOnChange ---------')
    console.log(event)
    console.log(ownProps)
    console.log(state)
  },
  handleAddEventSubmit: (values) => {
    // console.log(values)
    // console.log(ownProps)
    dispatch(stopSubmit('addEventForm'))
    dispatch(addEventStepNext(values))
    throw new SubmissionError({ multistep: 'Moving to the next step.', _error: 'Next Step!' })

    // dispatch(addEvent(values))
    // browserHistory.push('/')
  },
  handleAddEventSubmitFinal: (values) => {
    // console.log(values)
    // console.log(ownProps)
    // dispatch(addEventStepNext(values))
    dispatch(addEvent(values))
    dispatch(addEventStepReset())
    browserHistory.push('/')
  },
  handlePrev: () => {
    dispatch(addEventStepPrev())
  },
  addEventStepReset: () => {
    dispatch(addEventStepReset())
  },
  dispatch
})

const AddEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventForm)

export default AddEventContainer
