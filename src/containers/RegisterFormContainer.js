// import React from 'react'
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

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

let render = () => {
  const Form = require('../components/RegisterForm').default
  // const readme = require('./Example.md')
  const raw = require('!!raw!../components/RegisterForm')
  return (
        <div>

          <h2>Register</h2>

          <Form onSubmit={showResults}/>

          <Values form="register"/>

          <h2>Code</h2>

          <h4>RegisterForm.js</h4>

          <Code source={raw}/>
        </div>
  )
}
