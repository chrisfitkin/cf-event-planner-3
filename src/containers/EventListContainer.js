import { connect } from 'react-redux'
import { toggleEvent } from '../actions'
import EventList from '../components/EventList'

const getVisibleEvents = (events, filter) => {
  events.sort(function(a, b){
      return b.id-a.id
  })
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
    events: getVisibleEvents(state.events, state.visibilityFilter)
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
