import React, { Component } from 'react'
// const reducer = combineReducers({
//   form: reduxFormReducer // mounted under "form"
// })

const showResults = values => {
  console.log(values)
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      // todo, load successful snackbar(?) or modal alert message
      resolve()
    }, 500)
  })
}

const RegisterPage = (props) => {

  const RegisterForm = require('./RegisterForm').default
  return(
        <div>

          <h2>Form</h2>

          <RegisterForm onSubmit={showResults}/>

        </div>
  )
}

export default RegisterPage
