import React, { Component } from 'react';
import { Modal, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from "axios";

import './TopNav.css';

class TopNav extends Component {

  state = {
    modalOpen: true,
    isAuth: false,
    token: null,
    userName: null
  }

    componentDidMount() {
      const token = localStorage.getItem('token');
      const expiryDate = localStorage.getItem('expiryDate');
      /* since the username cannot be changed in the application,
         there is no need to make an api request to get current updates on user object */
      if (!token || !expiryDate) {
        return;
      }
      if (new Date(expiryDate) <= new Date()) {
        this.logoutHandler();
        return;
      }
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('username');
      const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
      this.setState({ isAuth: true, token: token, userName: userName, userId: userId });
      this.setAutoLogout(remainingMilliseconds);
    }

    logoutHandler = () => {
      this.setState({ isAuth: false, token: null, userName: null, userId: null });
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('expiryDate');
      localStorage.removeItem('userId');
      this.props.history.push("/auth");
    };


    setAutoLogout = milliseconds => {
      setTimeout(() => {
        this.logoutHandler();
      }, milliseconds);
    };



  handleOpen = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  initNextStepHandler = (step) => {
    if(step === 'gotoCreateNew') {
     const backdrop = document.getElementById('homeShareInfoBackdrop');
     const callout = document.getElementById('homeShareInfo');
     this.setState({ modalOpen: false })
     backdrop.style.display = 'block';
     callout.style.display = 'block';
   }

  }

  renderWelcomeModal () {
    // if(this.props.history.location.state) {
    // if(this.props.history.location.state.newUser) {
    return (
      <Modal className="modalWrapper" isOpen={this.state.modalOpen} toggle={this.handleOpen}>
        <div className="welcomeModal">
        <h5>>Welcome! {this.state.isAuth ? this.state.userName : '' } </h5>
        <p>Click next to get a quick guide on how to get started</p>
        <Button style={{ backgroundColor: "#eaeaea", color: "#000" }}>Skip</Button>
        <Button style={{ backgroundColor: "#000", border: "none", marginLeft: "1rem" }} color="primary" onClick={(step) => this.initNextStepHandler('gotoCreateNew')}>Next</Button>
        </div>
      </Modal>
    )
  }

  render() {

    return (
      <div className="nav__container">
      {this.renderWelcomeModal()}
      <h3 className="nav__tictalk">TicTalk</h3>
         <nav className="nav__nav">
            <ul className="nav__navcontainer">
               <li className="nav__navItems">{this.state.isAuth ? this.state.user : '' }</li>
               {this.state.isAuth ? <li onClick={this.logoutHandler} className="nav__navItems">Logout</li> : <li className="nav__navItems"><a href="/auth" style={{ textDecoration: 'none', color: 'inherit'}}>Login</a></li> }
            </ul>
         </nav>
      </div>
    )
}

}

export default withRouter(TopNav);
