import { connect } from 'react-redux'
import { addEvent } from '../actions'
import AddEventForm from '../components/AddEventForm'
import { browserHistory } from 'react-router'

const mapStateToProps = (state) => {
  // console.log("------------")
  // console.log(state)
  // return ({
  //   events: getVisibleEvents(state.events, state.visibilityFilter)
  // })
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  handleAddEventSubmit: (props) => {
    // console.log(props)
    dispatch(addEvent(props))
    browserHistory.push('/')
  },
  dispatch
})

const AddEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventForm)

export default AddEventContainer
