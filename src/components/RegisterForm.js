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
  if (values.password1 && !values.password1.match(/[a-zA-Z]/) ) {
    errors.password1 = 'Must contain a letter'
  }
  if (values.password1 && !values.password1.match(/[0-9]/) ) {
    errors.password1 = 'Must contain a number'
  }
  if (values.password1 && values.password1.length < 8) {
    errors.password1 = 'At least 8 characters required'
  }
  if (values.password2 && values.password2.length < 8) {
    errors.password2 = 'At least 8 characters'
  }
  if (values.password1 && values.password2 && values.password1 != values.password2) {
    errors.password2 = 'Passwords do not match'
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class RegisterForm extends Component {
  componentDidMount() {
    this.refs.name            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields: {name, email}} = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name" component={TextField} hintText="Chris Johnson" floatingLabelText="Name"
            ref="name" withRef autoFocus autoComplete="name"/>
        </div>
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
        {/* <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
        </div> */}
        <div>
          <RaisedButton type="submit" label="Register" disabled={pristine || submitting} primary={true} />
          {" "}
          <RaisedButton label="Clear" disabled={pristine || submitting} onClick={reset} />
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'registerForm',
  fields: ['name', 'email'],
  initialValues: {
    // name: 'Chris Fitkin'
  },
  validate
})(RegisterForm)
