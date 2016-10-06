import React, { Component } from 'react'
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
  Toggle
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
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class Form extends Component {
  componentDidMount() {
    this.refs.name            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name" component={TextField} hintText="Chris Johnson" floatingLabelText="Name"
            ref="name" withRef/>
        </div>
        <div>
          <Field name="email" component={TextField} hintText="joe@greatdomain.io" floatingLabelText="Email"/>
        </div>
        <div>
          <Field name="password1" component={password} hintText="" floatingLabelText="Password"/>
        </div>
        <div>
          <Field name="password2" component={password} hintText="" floatingLabelText="Confirm Password"/>
        </div>
        <div>
          <Field
            name="about"
            component={TextField}
            hintText="My story started way back when..."
            floatingLabelText="Tell us about you"
            multiLine={true}
            rows={2}/>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'register',
  initialValues: {
    // name: 'Jane Doe'
  },
  validate
})(Form)
