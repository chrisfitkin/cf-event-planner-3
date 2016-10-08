import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
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

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'email', 'password1', 'password2' ]
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
  return errors
}

class AddEventForm extends Component {

  constructor(props){
    super(props)
    // const maxSteps=3
  }

  state = {
    stepIndex: 0,
    maxSteps: 3,
  }

  componentDidMount() {
    this.refs.title            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  handleNext = () => {
    const {stepIndex, maxSteps} = this.state;
    if (stepIndex < maxSteps) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  renderStepActions(step) {
    const {maxSteps} = this.state;
    return (
      <div style={{margin: '12px auto'}}>
        {step < maxSteps-1 && (
          <RaisedButton
            label="Next"
            primary={true}
            onTouchTap={this.handleNext}
            style={{marginRight: 12}}
          />
        )}
        {step >= maxSteps-1 && (
          <RaisedButton
            type="submit"
            label="Create Event"
            primary={true}
            style={{marginRight: 12}}
          />
        )}
        {step > 0 && (
          <FlatButton
            label="Back"
            onTouchTap={this.handlePrev}
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
    const { handleSubmit, pristine, reset, submitting, handleAddEventSubmit} = this.props
    const {stepIndex, maxSteps} = this.state;
    // let title, host, eventType, startDate, startTime, endDate, endTime, location, message, inviteList
    let today = new Date();
    let todayFormatted = moment(today).format('MM/DD/YYYY');
    const eventTypeOptions = ["Birthday Party", "Conference", "Wedding", "Dinner", "Meet Up", "Work Meeting", "Drinks", "Baseball Game"]

    console.log(handleSubmit)
    return (
      <form onSubmit={handleSubmit(handleAddEventSubmit)}>
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
            <div>
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
              {this.renderStepActions(1)}
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
            When is the event
          </StepButton>
          <StepContent>
            <div>
              {this.renderStepActions(2)}
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
            Invite your friends
          </StepButton>
          <StepContent>
            <div>
              {this.renderStepActions(0)}
            </div>
          </StepContent>
        </Step>
      </Stepper>


        {/*
        searchText={this.state.eventType}
        onUpdateInput={searchText => this.setState({eventType: searchText})}
        onNewRequest={chosenRequest => this.setState({eventType: chosenRequest})}

        <div>
          <Field name="email" component={TextField} hintText="joe@greatdomain.io" floatingLabelText="Email" autoComplete="email"/>
        </div>
        <div>
          <Field name="password1" component={TextField} type="password" hintText="" floatingLabelText="Password"/>
        </div>
        <div>
          <Field name="password2" component={TextField} type="password" hintText="" floatingLabelText="Confirm Password"/>
        </div>
        <div>
          <Field
            name="about"
            component={TextField}
            hintText="My story started a long time ago, in a galaxy far far away..."
            floatingLabelText="Tell us about you"
            multiLine={true}
            rows={2}/>
        </div>
        */}
        <div>
          <RaisedButton type="submit" label="Add Event" disabled={pristine || submitting} primary={true} />
          {" "}
          <RaisedButton label="Reset" disabled={pristine || submitting} onClick={reset} />
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'addEventForm',
  fields: ['title'],
  initialValues: {
    // name: 'Chris Fitkin'
  },
  validate
})(AddEventForm)
