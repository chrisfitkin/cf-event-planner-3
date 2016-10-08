import React from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment';
import { addEvent } from '../actions'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem';
import AddressAutoComplete from '../components/AddressAutoComplete'
import PlaceAutoComplete from '../components/PlaceAutoComplete'


let divStyle = {
  maxWidth: 300,
  margin: '12px auto'
}

/**
 * A basic vertical non-linear implementation
 */
class AddEventStepper extends React.Component {

  constructor(props){
    super(props)
  }

  state = {
    stepIndex: 0,
    maxSteps: 3,
    title: '',
    host: '',
    eventType: '',
    startDate: {},
    startTime: {},
    endDate: {},
    endTime: {},
    location: '',
    message: '',
    inviteList: '',
    errors: {
      title: ''
    }
  }

  onHostChange (address, target){
    target.setState({value: `${address.street_number} ${address.route}`})
    // console.log(address)
    // console.log(target)
  }

  handleNext = () => {
    const {stepIndex, maxSteps} = this.state;
    if (stepIndex < maxSteps) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {maxSteps} = this.state;
    return (
      <div style={{margin: '12px auto'}}>
        {step < maxSteps-1 && (
          <RaisedButton
            label="Next"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={this.handleNext}
            style={{marginRight: 12}}
          />
        )}
        {step >= maxSteps-1 && (
          <RaisedButton
            label="Create Event"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={this.handleSubmit}
            style={{marginRight: 12}}
          />
        )}
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  handleValidate = (field, value) => {
    console.log(field)
    console.log(value)
    let newState = {};
    switch (field) {
      case 'title' :
          newState = { errors: { ...this.state.errors, title: value=="" ? 'required' : null } }
        break;
      case 'eventType' :
          newState = { errors: { ...this.state.errors, eventType: value=="" ? 'required' : null } }
        break;
      case 'host' :
          newState = { errors: { ...this.state.errors, host: value=="" ? 'required' : null } }
        break;
    }
    console.log(newState)
    if (newState.hasOwnProperty('errors')) {
      this.setState(newState)
      // this.forceUpdate()
      console.log(this.state)
    }
  }

  render() {
    const {stepIndex} = this.state;
    let title, host, eventType, startDate, startTime, endDate, endTime, location, message, inviteList
    let today = new Date();
    let todayFormatted = moment(today).format('MM/DD/YYYY');
    const eventTypeOptions = ["Birthday Party", "Conference", "Wedding", "Dinner", "Meet Up", "Work Meeting", "Drinks", "Baseball Game"]

    return (
      <div style={divStyle}>
        <form onSubmit={e => {
          e.preventDefault()
          console.log(title)
          if (!title.input.value.trim()) {
            return
          }
          addEvent(title.input.value) // should run this through dispatch or store.dispatch(addEvent(title.input.value))
          title.input.value = ''
          title.focus()
        }}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                About your event
              </StepButton>
              <StepContent>
                <TextField
                  floatingLabelText="Name your event"
                  hintText="My awesome party"
                  autoComplete="title"
                  autoFocus
                  required
                  ref={node => { title = node}}
                  value={this.state.title}
                  onChange={e => {this.setState({title: e.target.value});}}
                  onBlur={e => this.handleValidate('title',e.target.value)}
                  errorText={this.state.errors.title}
                /><br/>
                <AutoComplete
                  floatingLabelText="Type of event"
                  hintText="Birthday, Meet Up, etc..."
                  filter={AutoComplete.fuzzyFilter}
                  openOnFocus={true}
                  dataSource={eventTypeOptions}
                  required
                  ref={node => { eventType = node }}
                  searchText={this.state.eventType}
                  onUpdateInput={searchText => this.setState({eventType: searchText})}
                  onNewRequest={chosenRequest => this.setState({eventType: chosenRequest})}
                  onBlur={e => this.handleValidate('eventType',e.target.value)}
                  errorText={this.state.errors.eventType}
                /><br/>
                <PlaceAutoComplete
                  hintText="Acme, Co. or John Smith"
                  floatingLabelText="Hosted by"
                  autoComplete="name"
                  onChange={(address, name) => {this.onHostChange(address, location); this.setState({host:name, location:`${address.street_number} ${address.route}`})}}
                  required
                  ref={node => { host = node}}
                  value={this.state.host}
                  onBlur={(value) => this.handleValidate('host',value)}
                  errorText={this.state.errors.host}
                /><br/>
                <AddressAutoComplete
                  floatingLabelText="Where is it"
                  hintText="123 Main Street, Los Angeles, CA"
                  required
                  ref={node => { location = node }}
                  value={this.state.location}
                  onChange={(address) => {console.log(address); this.setState({location:address})}}
                /><br/>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                When is the event
              </StepButton>
              <StepContent>
                <DatePicker
                  autoOk
                  floatingLabelText="Starting day"
                  locale="en-US"
                  type="text"
                  name='startDate'
                  ref={ref => { startDate = ref }}
                  hintText={todayFormatted}
                  value={this.state.startDate}
                  onChange={(e, date) => {console.log(date);this.setState({startDate: date})}}
                /><br/>
                <TimePicker
                  hintText="12hr Format"
                  autoOk
                  floatingLabelText="Starting time"
                  name="startTime"
                  ref={ref => { startTime = ref }}
                  format="ampm"
                  value={this.state.startTime}
                  onChange={(e, date) => {console.log(date);this.setState({startTime: date})}}
                /><br/>
                <DatePicker
                  autoOk
                  floatingLabelText="Ending day"
                  locale="en-US"
                  type="text"
                  name='endDate'
                  ref={ref => { endDate = ref }}
                  hintText={todayFormatted}
                  value={this.state.endDate}
                  onChange={(e, date) => {console.log(date);this.setState({endDate: date})}}
                /><br/>
                <TimePicker
                  hintText="12hr Format"
                  autoOk
                  name="endTime"
                  ref={ref => { endTime = ref }}
                  floatingLabelText="Ending time"
                  format="ampm"
                  value={this.state.endTime}
                  onChange={(e, date) => {console.log(date);this.setState({endTime: date})}}
                /><br/>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                Invite your friends
              </StepButton>
              <StepContent>
                <TextField
                  floatingLabelText="List of emails to invite"
                  hintText="chris@coolcompany.com, mike@awesome.com, kim@yahoo.com"
                  multiLine={true}
                  rows={3}
                  ref={node => { inviteList = node}}
                  value={this.state.inviteList}
                  onChange={e => this.setState({inviteList: e.target.value})}
                /><br/>
                <TextField
                  floatingLabelText="Add a message"
                  hintText="Hi friends! Come join me at my cool new event :)"
                  multiLine={true}
                  rows={2}
                  ref={node => { message = node}}
                  value={this.state.message}
                  onChange={e => this.setState({message: e.target.value})}
                />
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </form>
      </div>
    );
  }
}
AddEventStepper = connect()(AddEventStepper)

export default AddEventStepper;
