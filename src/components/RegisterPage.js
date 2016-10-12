import React, { Component, PropTypes } from 'react'
import Snackbar from 'material-ui/Snackbar'
import RegisterForm from './RegisterForm'

let divStyle = {
  maxWidth: 300,
  margin: '12px auto'
}

class RegisterPage extends Component {

 constructor(props){
    super(props)
    this.state = {
      open: false,
    };
 }

  handleSubmit = () => {
    this.setState({
      open: true,
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  // const RegisterForm = require('./RegisterForm').default

  render() {
    return (
      <div style={divStyle}>
        {/*<h2 style={{fontFamily: this.context.muiTheme.fontFamily}}>Register a new user</h2>*/}
        <RegisterForm onSubmit={this.handleSubmit}/>
        <Snackbar
          open={this.state.open}
          message="Registration successful!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

RegisterPage.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};


export default RegisterPage
