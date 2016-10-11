import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle,
} from 'redux-form-material-ui'
import moment from 'moment';
import { addEvent } from '../actions'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import SubmissionError from 'redux-form'
import AddressAutoComplete from '../components/AddressAutoComplete'
import PlaceAutoComplete from '../components/PlaceAutoComplete'
import GoogleAutoComplete from '../components/GoogleAutoComplete'

const validate = values => {

  // const { store } = this.context
  // let state = store.getState()
  console.log(values)

  const errors = {}
  const requiredFields = [ 'title', 'eventType', 'host', 'location' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  // if (values.pizzas > 15) {
  //   errors.pizzas = 'Are you mad?'
  // }
  // if (values.password1 && !values.password1.match(/[a-zA-Z]/) ) {
  //   errors.password1 = 'Must contain a letter'
  // }
  // if (values.password1 && !values.password1.match(/[0-9]/) ) {
  //   errors.password1 = 'Must contain a number'
  // }
  // if (values.password1 && values.password1.length < 8) {
  //   errors.password1 = 'At least 8 characters required'
  // }
  // if (values.password2 && values.password2.length < 8) {
  //   errors.password2 = 'At least 8 characters'
  // }
  // if (values.password1 && values.password2 && values.password1 != values.password2) {
  //   errors.password2 = 'Passwords do not match'
  // }
  // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }







  // TODO:
  // move the stepIndex variable to the container state
  // handleSubmit on every step
  // switch through the stepIndex in validation
  // dispatch stepIndex++ increment on success
  // return no errors ONLY if final step (fake error to allow stepping)









  return errors
}


// let AddEventForm = props => {
// const { handleSubmit, load, pristine, reset, submitting } = props
class AddEventForm extends Component {

  constructor(props){
    super(props)
    const { stepIndex, handlePrev } = props
    // console.log(stepIndex)
  }

  state = {
    // stepIndex: this.props.stepIndex,
    maxSteps: 3,
  }

  componentDidMount() {
    this.refs.title            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField

  }

  // handlePrev = () => {
  //   const {stepIndex} = this.props;
  //   if (stepIndex > 0) {
  //     this.setState({stepIndex: stepIndex - 1});
  //   }
  // };

  // handleNext = () => {
  //
  //   const { store } = this.context
  //   let state = store.getState()
  //   let { values } = state.form.addEventForm
  //   // console.log(values)
  //   const {maxSteps} = this.state
  //   const {stepIndex} = this.props
  //   let nextStep = stepIndex + 1;
  //
  //   // Validate Step
  //   const errors = {}
  //   const requiredFields = [ 'title', 'eventType' ]
  //   requiredFields.forEach(field => {
  //     if (typeof values === 'undefined' || typeof values[ field ] === 'undefined' || !values[ field ]) {
  //       errors[ field ] = 'Required'
  //     }
  //   })
  //   if (Object.keys(errors).length > 0) {
  //     // set errors manually if any found
  //     // throw new SubmissionError(errors)
  //     // console.log(errors)
  //     store.setState({
  //       form: {
  //         registerForm: {
  //           syncErrors: errors,
  //           submitFailed: true
  //         }
  //       }
  //     })
  //   } else if (stepIndex < maxSteps) {
  //     // go to next step
  //     this.setState({stepIndex: nextStep});
  //   }
  //
  //
  //
  // };

  renderStepActions(step) {
    const {maxSteps} = this.state;
    const { addEventStepPrev, handlePrev, stepIndex } = this.props;
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
            lastStep={maxSteps == stepIndex + 1}
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

  // handleSubmit = () => {
  //   const { dispatch } = this.props;
  //   dispatch(addEvent(this.state))
  //   browserHistory.push('/')
  // }

  render() {
    const { errors, handleSubmit, pristine, reset, submitting, fields, handleAddEventSubmit, stepIndex} = this.props
    const { maxSteps } = this.state;
    // let title, host, eventType, startDate, startTime, endDate, endTime, location, message, inviteList
    let today = new Date();
    let todayFormatted = moment(today).format('MM/DD/YYYY');
    const eventTypeOptions = ["Birthday Party", "Conference", "Wedding", "Dinner", "Meet Up", "Work Meeting", "Drinks", "Baseball Game"]

    console.log("---------- this ----------")
    console.log(this)

    // console.log("---------- errors ----------")
    // console.log(errors)

    // console.log(handleSubmit)
    return (
        <form onSubmit={handleSubmit(handleAddEventSubmit)}>
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
                  floatingLabelText="Hosted by"
                  autoComplete="name"
                  placesTypes={['establishment']}
                  required
                  ref="host"
                  name="host"
                  errorText={(fields.host && fields.host.touched) ? errors.host : ''}
                  onPlaceChanged={e => {
                    console.log('inline onPlaceChanged')
                    console.log(e)
                    console.log(e.formatted_address)
                    //this.props.fields.location.onChange(e.formatted_address)
                    this.refs.location.getRenderedComponent().props.input.onChange(e.formatted_address)
                    console.log(this)
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
                {this.renderStepActions(2)}
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </form>

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
