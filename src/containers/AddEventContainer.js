import { connect } from 'react-redux'
import { addEvent, addEventStepNext, addEventStepPrev } from '../actions'
import AddEventForm from '../components/AddEventForm'
import { browserHistory } from 'react-router'

const mapStateToProps = (state) => {
  // console.log("------------")
  // console.log(state)
  // return ({
  //   events: getVisibleEvents(state.events, state.visibilityFilter)
  // })
  return ({
    stepIndex: state.addEventStepper.stepIndex
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
