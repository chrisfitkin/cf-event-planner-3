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
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  events: getVisibleEvents(state.events, state.visibilityFilter)
})

const mapDispatchToProps =  ({
  onEventClick: toggleEvent
})

const EventListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)

export default EventListContainer
