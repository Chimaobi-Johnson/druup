import React, { Component } from 'react';
import axios from 'axios';
import InfoCard from "../../components/Card/InfoCard";

import './AuthPage.css';

class AuthPage extends Component {

  state = {
    RegisterForm: {
      regEmail: {
        value: '',
        required: true,
        min: 10,
        max: 255
      },
      regPassword: {
        value: '',
        required: true,
        min: 4,
        max: 255
      },
      regUsername: {
        value: '',
        required: false,
        min: 3,
        max: 80
      }
    },
    loginForm: {
      loginEmail: '',
      loginPassword: ''
    },
    registering: false,
    addUserName: false,
    userData: null,
    regLoading: false,
    usernameLoading: false,
    loginLoading: false,
    loginErrorMessage: null
  }

  inputChangeHandler = (event, inputName) => {
      const registerForm = { ...this.state.RegisterForm }
      registerForm[inputName].value = event.target.value;
      this.setState({ RegisterForm: registerForm });
  }

  loginInputChangeHandler = (event, inputName) => {
    const loginForm = { ...this.state.loginForm }
    loginForm[inputName] = event.target.value;
    this.setState({ loginForm });
  }

  validateEmail = (email) => {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
    return (true)
    }
    return (false)
    }

  registerUserHandler = (event) => {
     event.preventDefault();
     const email = this.state.RegisterForm.regEmail.value;
     const password = this.state.RegisterForm.regPassword.value;
     // const userName = this.state.RegisterForm.regUsername.value;
     let isEmailValid = this.validateEmail(email);
     if(!isEmailValid) {
       alert('Email Not Correct')
     } else if(password.length < 4) {
       alert('Password cannot be less than 4 characters')
     } else {
       this.setState({ regLoading: true });
       // let regData = new FormData();
       // regData.append('email', email);
       // regData.append('password', password);
       const regData = {
         email: email,
         password: password
       }
       axios.post('/api/register', regData)
       .then(result => {
         console.log(result);
         this.setState({ addUserName: true, userData: result.data.user, regLoading: false  });
       }).catch(error => {
         console.log(error);
         this.setState({ regLoading: false });
       })
     }
  }

  loginHandler = (event) => {
    event.preventDefault();
    const email = this.state.loginForm.loginEmail;
    const password = this.state.loginForm.loginPassword;
    if(email === '') {
      alert('Email field cannot be empty!');
      return;
    }
    this.setState({ loginLoading: true });
    const loginData = {
      email: email,
      password: password
    }
    axios.post('/api/login', loginData)
    .then(response => {
      console.log(response);
      this.setState({ loginLoading: false });
    })
    .catch(err => {
      console.log(err)
      this.setState({ loginLoading: false });
      if (err.response) {
        if(err.response.status === 500) {
          this.setState({ loginErrorMessage: err.response.data.message })
        } else if (err.response.status === 401) {
          this.setState({ loginErrorMessage: err.response.data.message })
        } else {
          this.setState({ loginErrorMessage: 'Error. Please check connection settings or try again later' })
        }

     }
    })
  }


  addUserNameHandler = (event) => {
      event.preventDefault();

      const userName = this.state.RegisterForm.regUsername.value;
      if(userName.length < 3) {
        alert('Sorry your username cannot be less than 3 characters');
      } else {
        this.setState({ usernameLoading: true });
        const userNameData = {
          userName: userName,
          userId: this.state.userData._id
        }
        axios.post('/api/register/addusername', userNameData).then(user => {
          console.log(user);
          this.setState({ userData: user.data, usernameLoading: false });
          this.props.history.push({
			      pathname: '/',
			      state: { newUser: true }
		     	});
        }).catch(error => {
          this.setState({ usernameLoading: false })
        })
      }

    }

  changeAuthModeHandler = () => {
    this.setState({ registering: !this.state.registering });
  }

  gotoHomePage = () => {
    this.props.history.push({
			  pathname: '/',
			  state: { newUser: true }
			});
  }

  renderUserNameForm() {
    return (
      <>
        <div className="auth__formcontainer">
          <p className="auth__successalert">Registration Successful</p>
         <label htmlFor="username">UserName</label>
         <input onChange={(event, inputName) => this.inputChangeHandler(event, 'regUsername')} type="text" id="username" placeholder=" Enter UserName" />
        </div>

        <button onClick={this.addUserNameHandler} className="auth__submitbtn" type="submit">{this.state.usernameLoading ? 'Loading...' : 'Continue'}</button>
        <button onClick={this.gotoHomePage} className="auth__submitbtn">Skip</button>
      </>
    )
  }

   renderRegisterForm() {
    return (
      <>
        <div className="auth__formcontainer">
         <label htmlFor="email">Email</label>
         <input onChange={(event, inputName) => this.inputChangeHandler(event, 'regEmail')} type="email" id="email" placeholder=" Enter Email" />
        </div>

        <div className="auth__formcontainer">
         <label htmlFor="password">Password</label>
         <input onChange={(event, inputName) => this.inputChangeHandler(event, 'regPassword')} type="password" placeholder=" Enter Password" id="password" />
        </div>

        <button onClick={this.registerUserHandler} className="auth__submitbtn" type="submit">{this.state.regLoading ? 'Loading..' : 'Register'}</button>
        <p style={{ paddingTop: '1rem'}}> Already have an account? Click <span onClick={this.changeAuthModeHandler} style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }}>here</span> to login</p>
      </>
    )
  }

  renderLoginForm () {
   return (
     <>
       <div className="auth__formcontainer">
        {this.state.loginErrorMessage ? <p style={{ paddingLeft: '1rem', padding: '.5rem', color: '#fd5252', backgroundColor: '#fafafa', fontSize: '.9rem' }}>{this.state.loginErrorMessage}</p> : null }
        <label htmlFor="email">Email</label>
        <input onChange={(event, inputName) => this.loginInputChangeHandler(event, 'loginEmail')} type="email" id="email" placeholder=" Enter Email" />
       </div>

       <div className="auth__formcontainer">
        <label htmlFor="password">Password</label>
        <input onChange={(event, inputName) => this.loginInputChangeHandler(event, 'loginPassword')} type="password" placeholder=" Enter Password" id="password" />
       </div>

       <button onClick={this.loginHandler} className="auth__submitbtn" type="submit">{this.state.loginLoading ? 'Loading..' : 'Login'}</button>
       <p style={{ paddingTop: '1rem'}}> Dont have an account? Click <span onClick={this.changeAuthModeHandler} style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }}>here</span> to register</p>

     </>
   )
 }

  render() {
    let authForm;
    if(this.state.registering) {
      authForm = (
        <form className="auth__form">
          {this.state.addUserName ? this.renderUserNameForm() : this.renderRegisterForm()}
        </form>
      )
    } else {
      authForm = (
        <form className="auth__form">
          {this.renderLoginForm()}
        </form>
      )
    }

    return (
    	<div className="auth__container">
           <div className="auth__contentbox">
            <InfoCard>
            <h4>TicTalk</h4>
              {authForm}
            </InfoCard>
             </div>
         </div>
    )
  }
}

export default AuthPage;
