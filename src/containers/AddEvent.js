import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'

import TextField from 'material-ui/TextField'
// import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
// import DatePicker from 'react-toolbox/lib/date_picker';
// import DatePicker from 'material-ui/DatePicker';

// Check this out for submit handling
// https://github.com/chrisfitkin/react-redux-blog/blob/master/public/src/components/PostsForm.js
let AddEvent = ({ dispatch }) => {
  let title, host, eventType, startDate, startTime, endDate, endTime, guestList, location, message
  let today = new Date();
  let todayFormatted = moment(today).format('MM/DD/YYYY');
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        console.log(title)
        if (!title.input.value.trim()) {
          return
        }
        dispatch(addEvent(title.input.value))
        title.input.value = ''
        title.focus()
      }}>

      <TextField
        floatingLabelText="Name your event"
        hintText="A day at the beach"
        autoComplete="title"
        autoFocus
        required
        ref={node => { title = node}}
      /><br/><br/>
      <button className='btn btn-default' type="submit">
        Add Event
      </button>
      </form>
    </div>
  )
}
AddEvent = connect()(AddEvent)

export default AddEvent
