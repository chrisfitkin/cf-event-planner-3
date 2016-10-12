import React, { PropTypes } from 'react'
import Event from './Event'

import {List} from 'material-ui/List';
// import {List, ListItem} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
// import Subheader from 'material-ui/Subheader';


const EventList = ({ events, onEventClick }) => (
  <List>
    {events.map(event =>
      <Event
        key={event.id}
        {...event}
        onClick={() => onEventClick(event.id)}
      />
    )}
  </List>
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
