import React from 'react';
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

/**
 * A basic vertical non-linear implementation
 */
class AddEventStepper extends React.Component {

  state = {
    stepIndex: 0,
    title: '',
    host: '',
    eventType: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    guestList: '',
    location: '',
    message: '',
    inviteList: ''
  };

  onHostChange (address, target){
    target.setState({value: `${address.street_number} ${address.route}`})
    // console.log(address)
    // console.log(target)
  }


  handleNext = () => {
    let maxSteps = 3
    const {stepIndex} = this.state;
    if (stepIndex < maxSteps-1) {
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
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
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

  render() {
    const {stepIndex} = this.state;
    let title, host, eventType, startDate, startTime, endDate, endTime, guestList, location, message, inviteList
    let today = new Date();
    let todayFormatted = moment(today).format('MM/DD/YYYY');
    const eventTypeOptions = ["Birthday Party", "Conference", "Wedding", "Dinner", "Meet Up", "Work Meeting", "Drinks", "Baseball Game"]

    return (
      <div style={{margin: 'auto'}}>
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
                  hintText="A day at the beach"
                  autoComplete="title"
                  autoFocus
                  required
                  ref={node => { title = node}}
                  value={this.state.title}
                  onChange={e => this.setState({title: e.target.value})}
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
                /><br/>
                <PlaceAutoComplete
                  hintText="Acme, Co. or John Smith"
                  floatingLabelText="Hosted by"
                  autoComplete="name"
                  onChange={(address, name) => {this.onHostChange(address, location); this.setState({host:name, location:`${address.street_number} ${address.route}`})}}
                  required
                  ref={node => { host = node}}
                  value={this.state.host}
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
                <p>Lorem ipsum</p>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </form>
      </div>
    );
  }
}

export default AddEventStepper;
