import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem';
import AddressAutoComplete from '../components/AddressAutoComplete'
import PlaceAutoComplete from '../components/PlaceAutoComplete'

const onHostChange = (address, target) => {
  // target.setState({value: `${address.street_number} ${address.route}`})
  console.log(address)
  console.log(target)
}

// Check this out for submit handling
// https://github.com/chrisfitkin/react-redux-blog/blob/master/public/src/components/PostsForm.js
let AddEventStep1 = ({ dispatch }) => {
  let title, host, eventType, startDate, startTime, endDate, endTime, guestList, location, message, inviteList
  const eventTypeOptions = ["Birthday Party", "Conference", "Wedding", "Dinner", "Meet Up", "Work Meeting", "Drinks", "Baseball Game"]
  return (
    <div>
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
        onChange={address => onHostChange(address, location)}
        required
        ref={node => { host = node}}
      /><br/>
      <AddressAutoComplete
        floatingLabelText="Where is it"
        hintText="123 Main Street, Los Angeles, CA"
        required
        ref={node => { location = node }}
      /><br/>
    </div>
  )
}
AddEventStep1 = connect()(AddEventStep1)

export default AddEventStep1
