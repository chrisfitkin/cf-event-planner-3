import { connect } from 'react-redux'
import { toggleEvent } from '../actions'
import EventList from '../components/EventList'

const getVisibleEvents = (events, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return events
    case 'SHOW_FAVORITE':
      return events.filter(t => t.favorite)
    default:
      // throw new Error('Unknown filter: ' + filter)
      console.log('Unknown filter: ' + filter)
      return events
  }
}

const mapStateToProps = (state) => {
  // console.log("------------")
  // console.log(state)
  return ({
    events: getVisibleEvents(state.default.events, state.default.visibilityFilter)
  })
}

const mapDispatchToProps =  ({
  onEventClick: toggleEvent
})

const EventListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)

export default EventListContainer
