import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem';
import AddressAutoComplete from '../components/AddressAutoComplete'
import PlaceAutoComplete from '../components/PlaceAutoComplete'

const onHostChange = (address, target) => {
  target.setState({value: `${address.street_number} ${address.route}`})
  // console.log(target)
}

// Check this out for submit handling
// https://github.com/chrisfitkin/react-redux-blog/blob/master/public/src/components/PostsForm.js
let AddEvent = ({ dispatch }) => {
  let title, host, eventType, startDate, startTime, endDate, endTime, guestList, location, message, inviteList
  let today = new Date();
  let todayFormatted = moment(today).format('MM/DD/YYYY');
  const eventTypeOptions = ["Birthday Party", "Conference", "Wedding", "Dinner", "Meet Up", "Work Meeting", "Drinks", "Baseball Game"]
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
      /><br/>
      <AutoComplete
        floatingLabelText="Type of event"
        hintText="Birthday, Meet Up, etc..."
        filter={AutoComplete.fuzzyFilter}
        openOnFocus={true}
        dataSource={eventTypeOptions}
        required
        ref={node => { eventType = node }}
      /><br/>
      <PlaceAutoComplete
        hintText="Acme, Co. or John Smith"
        floatingLabelText="Hosted by"
        autoComplete="name"
        onChange={address => onHostChange(address)}
        required
        ref={node => { host = node}}
      /><br/>
      <AddressAutoComplete
        floatingLabelText="Where is it"
        hintText="123 Main Street, Los Angeles, CA"
        required
        ref={node => { location = node }}
      /><br/>
      <DatePicker
        autoOk
        floatingLabelText="What day"
        type="text"
        name='startDate'
        ref={ref => { startDate = ref }}
        hintText={todayFormatted}
      /><br/>
      <TimePicker
        hintText="12hr Format"
        autoOk
        floatingLabelText="What time"
        name="startTime"
        ref={ref => { startTime = ref }}
        format="ampm"
      /><br/>
      <DatePicker
        autoOk
        floatingLabelText="Ending day"
        type="text"
        name='endDate'
        ref={ref => { endDate = ref }}
        hintText={todayFormatted}
      /><br/>
      <TimePicker
        hintText="12hr Format"
        autoOk
        name="endTime"
        ref={ref => { endTime = ref }}
        floatingLabelText="Ending time"
        format="ampm"
      /><br/>
      <TextField
        floatingLabelText="Invite your friends"
        hintText="chris@coolcompany.com, mike@awesome.com, kim@yahoo.com"
        multiLine={true}
        rows={3}
        ref={node => { inviteList = node}}
      /><br/>
      <TextField
        floatingLabelText="Send a message"
        hintText="Hi friends! Come join me at my cool new event :)"
        multiLine={true}
        rows={3}
        ref={node => { inviteList = node}}
      />
      <br/>
      <RaisedButton className='btn btn-default' type="submit">
        Add Event
      </RaisedButton>
      </form>
    </div>
  )
}
AddEvent = connect()(AddEvent)

export default AddEvent
