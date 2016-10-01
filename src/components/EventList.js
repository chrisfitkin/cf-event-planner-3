import React, { PropTypes } from 'react'
import Event from './Event'

const EventList = ({ events, onEventClick }) => (
  <ul>
    {events.map(event =>
      <Event
        key={event.id}
        {...event}
        onClick={() => onEventClick(event.id)}
      />
    )}
  </ul>
)

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    favorite: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onEventClick: PropTypes.func.isRequired
}

export default EventList
