import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'
// import RaisedButton from 'material-ui/RaisedButton';
// import moment from 'moment';
// import DatePicker from 'react-toolbox/lib/date_picker';
// import DatePicker from 'material-ui/DatePicker';

// Check this out for submit handling
// https://github.com/chrisfitkin/react-redux-blog/blob/master/public/src/components/PostsForm.js
let AddEvent = ({ dispatch }) => {
  let title, host, eventType, startDate, startTime, endDate, endTime, guestList, location, message
  // let today = new Date();
  // let todayFormatted = moment(today).format('MM/DD/YYYY');
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!title.value.trim()) {
          return
        }
        dispatch(addEvent(title.value))
        title.value = ''
        title.focus()
      }}>
        <br/>
        <button className='btn btn-default' type="submit">
          Add Event
        </button>
      </form>
    </div>
  )
}
AddEvent = connect()(AddEvent)

export default AddEvent
