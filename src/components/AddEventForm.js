import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form'
import {
  AutoComplete,
  DatePicker,
  TimePicker,
  TextField,
} from 'redux-form-material-ui'
import moment from 'moment';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import GoogleAutoComplete from '../components/GoogleAutoComplete'

const validate = values => {

  // const { store } = this.context
  // let state = store.getState()
  // console.log(values)

  const errors = {}
  const requiredFields = [ 'title', 'eventType', 'host', 'location', 'startDate', 'startTime', 'endDate', 'endTime' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  if (values.startDate) {
    let today = new Date()
    today.setHours(0,0,0,0)
    let startDate = new Date(values.startDate)
    startDate.setHours(0,0,0,0)
    let todayMoment = moment(today)
    let startDateMoment = moment(startDate)
    if(startDateMoment.isBefore(todayMoment)) {
      console.log("Cannot start in the past")
      errors.startDate = "Cannot start in the past"
    }
  }
  if (values.startDate && values.endDate) {
    let startDate = new Date(values.startDate)
    startDate.setHours(0,0,0,0)
    let endDate = new Date(values.endDate)
    endDate.setHours(0,0,0,0)
    console.log(endDate)
    console.log(startDate)
    if (moment(endDate).isBefore(moment(startDate))){
      console.log("Cannot end after the start date")
      errors.endDate = 'Cannot end after the start date'
    }
  }
  if (values.startDate && values.endDate && values.startTime && values.endTime) {
    let startDate = new Date(values.startDate)
    startDate.setHours(0,0,0,0)
    let endDate = new Date(values.endDate)
    endDate.setHours(0,0,0,0)
    let startTime = new Date(values.startTime)
    let endTime = new Date(values.endTime)
    if (moment(endDate).isSame(moment(startDate))
      && moment(endTime).isBefore(moment(startTime))){
      console.log("Cannot end after the start time")
      errors.endTime = 'Cannot end after the start time'
    }
  }
  // if (values.pizzas > 15) {
  //   errors.pizzas = 'Are you mad?'
  // }
  // if (values.password1 && !values.password1.match(/[a-zA-Z]/) ) {
  //   errors.password1 = 'Must contain a letter'
  // }
  return errors
}


// let AddEventForm = props => {
// const { handleSubmit, load, pristine, reset, submitting } = props
class AddEventForm extends Component {

  state = {
    // stepIndex: this.props.stepIndex,
    maxSteps: 3,
  }

  componentDidMount() {
    const { stepIndex, addEventStepReset } = this.props
    if (stepIndex > 0 ) addEventStepReset()
    if (this.refs.title) {
      // this.refs.title            // the Field
      // .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      // .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      // .focus()                // on TextField
      // console.log('setting focus')
    }
  }

  renderStepActions(step) {
    const {maxSteps} = this.state;
    const { handlePrev, stepIndex } = this.props;
    return (
      <div style={{margin: '12px auto'}}>
        {step < maxSteps-1 && (
          <RaisedButton
            label="Next"
            type="submit"
            primary={true}
            // onTouchTap={this.handleNext}
            style={{marginRight: 12}}
          />
        )}
        {step >= maxSteps-1 && (
          <RaisedButton
            type="submit"
            label="Create Event"
            primary={true}
            style={{marginRight: 12}}
            lastStep={maxSteps === stepIndex + 1}
          />
        )}
        {step > 0 && (
          <FlatButton
            label="Back"
            onTouchTap={handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { errors, handleSubmit, fields, handleAddEventSubmit, handleAddEventSubmitFinal, stepIndex, handleCustomOnChange} = this.props
    // const { errors, handleSubmit, pristine, reset, submitting, fields, handleAddEventSubmit, handleAddEventSubmitFinal, stepIndex} = this.props
    const { maxSteps } = this.state;
    // let title, host, eventType, startDate, startTime, endDate, endTime, location, message, inviteList
    let today = new Date();
    let todayFormatted = moment(today).format('MM/DD/YYYY');
    const eventTypeOptions = ["Birthday Party", "Conference", "Wedding", "Dinner", "Meet Up", "Work Meeting", "Drinks", "Baseball Game"]

    // console.log("---------- this ----------")
    // console.log(this)

    // console.log("---------- errors ----------")
    // console.log(errors)

    // console.log(handleSubmit)
    return (
      <div style={{margin: '12px auto', maxWidth: 300}}>
        <form onSubmit={stepIndex===maxSteps-1 ? handleSubmit(handleAddEventSubmitFinal) : handleSubmit(handleAddEventSubmit)}>
          <Stepper
            activeStep={stepIndex}
            linear={true}
            orientation="vertical"
          >
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                About your event
              </StepButton>
              <StepContent>
              <div>
                <Field component="input" type="hidden" name="stepIndex" ref="stepIndex" value={stepIndex} />
                <Field
                  component={TextField}
                  name="title"
                  floatingLabelText="Name your event"
                  hintText="My awesome party"
                  autoComplete="title"
                  autoFocus
                  required
                  ref="title"
                  withRef
                />
              </div>
              <div>
                <Field
                  component={AutoComplete}
                  floatingLabelText="Type of event"
                  hintText="Birthday, Meet Up, etc..."
                  filter={AutoComplete.fuzzyFilter}
                  openOnFocus={true}
                  dataSource={eventTypeOptions}
                  required
                  ref="eventType"
                  name="eventType"
                />
              </div>
              <div>
                <Field
                  component={GoogleAutoComplete}
                  hintText="Acme, Co. or John Smith"
                  floatingLabelText="Hosting company"
                  autoComplete="name"
                  placesTypes={['establishment']}
                  required
                  ref="host"
                  withRef={true}
                  name="host"
                  errorText={(fields.host && fields.host.touched) ? errors.host : ''}
                  onPlaceChanged={e => {
                    // console.log('inline onPlaceChanged')
                    // console.log(e)
                    // console.log(e.formatted_address)
                    //this.props.fields.location.onChange(e.formatted_address)
                    this.refs.location.getRenderedComponent().props.input.onChange(e.formatted_address)
                    // console.log(this)
                  }}
                />
              </div>
              <div>
                <Field
                  component={GoogleAutoComplete}
                  floatingLabelText="Where is it"
                  hintText="123 Main Street, Los Angeles, CA"
                  placesTypes={['geocode']}
                  addressPart="formatted_address"
                  required
                  name="location"
                  errorText={(fields.location && fields.location.touched) ? errors.location : ''}
                  ref="location"
                  withRef={true}
                />
              </div>
              <div>
                {this.renderStepActions(0)}
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
              When is the event
            </StepButton>
            <StepContent>
              <div>
                <Field
                  component={DatePicker}
                  autoOk
                  floatingLabelText="Starting day"
                  locale="en-US"
                  type="text"
                  name='startDate'
                  ref='startDate'
                  errorText={(fields.startDate && fields.startDate.touched) ? errors.startDate : ''}
                  hintText={todayFormatted}
                  onChange={e => handleCustomOnChange(e)}
                  onBlur={e => handleCustomOnChange(e)}
                />
              </div>
              <div>
                <Field
                  component={TimePicker}
                  hintText="12hr Format"
                  autoOk
                  floatingLabelText="Starting time"
                  name="startTime"
                  ref="startTime"
                />
              </div>
              <div>
                <Field
                  component={DatePicker}
                  autoOk
                  floatingLabelText="Ending day"
                  locale="en-US"
                  type="text"
                  name='endDate'
                  ref='endDate'
                  hintText={todayFormatted}
                />
              </div>
              <div>
                <Field
                  component={TimePicker}
                  hintText="12hr Format"
                  autoOk
                  name="endTime"
                  ref="endTime"
                  floatingLabelText="Ending time"
                />
              </div>
              <div>
                {this.renderStepActions(1)}
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
              Invite your friends
            </StepButton>
            <StepContent>
              <div>
                <Field
                  component={TextField}
                  floatingLabelText="List of emails to invite"
                  hintText="chris@coolcompany.com, mike@awesome.com, kim@yahoo.com"
                  multiLine={true}
                  rows={3}
                  name="inviteList"
                  ref="inviteList"
                />
              </div>
              <div>
                <Field
                  component={TextField}
                  floatingLabelText="Add a message"
                  hintText="Hi friends! Come join me at my cool new event :)"
                  multiLine={true}
                  rows={2}
                  name="message"
                  ref="message"
                />
              </div>
              <div>
                {this.renderStepActions(2)}
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </form>
    </div>
    )
  }
}
AddEventForm.contextTypes = {
  store: React.PropTypes.object
}

AddEventForm = reduxForm({
  form: 'addEventForm',
  fields: ['stepIndex', 'title', 'eventType', 'host', 'location'],
  initialValues: {
    // name: 'Chris Fitkin'
  },
  validate: validate
})(AddEventForm)

export default AddEventForm;
