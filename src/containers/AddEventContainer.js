import { connect } from 'react-redux'
import { toggleEvent } from '../actions'
import AddEventForm from '../components/AddEventForm'

const handleSubmit = (props) => {
  console.log(props)
}
const handleValidate = (props) => {
  console.log(props)
}

const mapStateToProps = (state) => {
  // console.log("------------")
  // console.log(state)
  // return ({
  //   events: getVisibleEvents(state.events, state.visibilityFilter)
  // })
  return undefined
}

const mapDispatchToProps =  ({
  handleSubmit,
  handleValidate
})

const AddEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEventForm)

export default AddEventContainer
