import React from 'react'
// import ReactDOM from 'react-dom'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// import { Provider } from 'react-redux'
// import { createStore, combineReducers } from 'redux'
// import { reducer as reduxFormReducer } from 'redux-form'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import {
//   Code,
//   Markdown,
//   Values
// } from 'redux-form-website-template'
// injectTapEventPlugin()


// const dest = document.getElementById('content')
// const reducer = combineReducers({
//   form: reduxFormReducer // mounted under "form"
// })
// const store =
//   (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)
import { connect } from 'react-redux'
import RegisterForm from '../components/RegisterForm'

import {
  Code,
  Markdown,
  Values
} from 'redux-form-website-template'


// const RegisterForm = require('../components/RegisterForm').default
// const readme = require('./Example.md')
const raw = require('!!raw!../components/RegisterForm')

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })


const mapStateToProps = (state) => {
  // return ({
  //   events: getVisibleEvents(state.default.events, state.default.visibilityFilter)
  // })
  console.log('state.default.register.registerForm')
  console.log(state.default.register.registerForm)
  return {
    register: state.default.register.registerForm // <---------
  };
}

const mapDispatchToProps = (dispatch) =>  ({
  onSubmit: showResults,
  dispatch
})

let RegisterFormContainer = (props) => {
  const Form = require('../components/RegisterForm').default
  return (
    <div>

      <h2>RegisterForm</h2>

      <RegisterForm onSubmit={showResults} {...props}/>

    </div>
  )
}

RegisterFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormContainer)

export default RegisterFormContainer
