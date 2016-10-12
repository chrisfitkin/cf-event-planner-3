import React from 'react'

import { connect } from 'react-redux'
import RegisterForm from '../components/RegisterForm'

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
