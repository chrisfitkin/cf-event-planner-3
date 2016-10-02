import React from 'react';
import moment from 'moment';
import { addEvent } from '../actions'
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import AddEventStep1 from './AddEventStep1'

/**
 * A basic vertical non-linear implementation
 */
class AddEventStepper extends React.Component {

  state = {
    stepIndex: 0,
  };

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
                Step 1
              </StepButton>
              <StepContent>
                <AddEventStep1 />
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                Step 2
              </StepButton>
              <StepContent>
                <p>Lorem ipsum</p>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                Step 3
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
