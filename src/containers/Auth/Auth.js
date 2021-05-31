import React, { Component } from 'react';
import style from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';

function validateEmail(email) {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(String(email.toLowerCase()));
}

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter valid email',
        touched: false,
        valid: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter valid password',
        touched: false,
        valid: false,
        validation: {
          required: true,
          minLength: 6,
        }
      }
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBRj1R0UEHzbzdDaOOQIhjqWUvDsusN4Mo', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBRj1R0UEHzbzdDaOOQIhjqWUvDsusN4Mo', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }


  submitHandler = event => {
    event.preventDefault();
  }

  isValid = ({validation, value}) => {

    if (!validation) {
      return true;
    }

    let isValid = true;

    if(validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = formControls[controlName];

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.isValid(control);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    })

    this.setState({isFormValid, formControls});
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return <Input
        key={`${controlName} + ${index}`}
        type={control.type}
        label={control.label}
        value={control.value}
        valid={control.valid}
        shouldValidate={!!control.validation}
        touched={control.touched}
        errorMessage={control.errorMessage}
        onChange={event => this.onChangeHandler(event, controlName)}
      />
    })
  }

  render() {
    return (
      <div className={style.Auth}>
        <div>
          <h1>Auth</h1>
          <form
            onSubmit={this.submitHandler}
            className={style.AuthForm}>

            { this.renderInputs() }

            <Button
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Sign In
            </Button>

            <Button
              type='primary'
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth;