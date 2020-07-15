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
        // this.props.history.push("/auth");
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

 closeWelcomeModal = () => {
   this.setState({ modalOpen: false });
 }

  renderWelcomeModal () {
    if(this.props.history.location.state) {
      if(this.props.history.location.state.newUser) {
         return (
           <Modal className="modalWrapper" isOpen={this.state.modalOpen} toggle={this.handleOpen}>
            <div className="welcomeModal">
             <h5>Hello {this.state.isAuth ? this.state.userName : '' }! </h5>
             <p>Welcome to ticktalk app. To get started click on the share button below to share your link
             and get responses from your friends. Their comments about you will be displayed on this page :)</p>
             <Button onClick={this.closeWelcomeModal} style={{ backgroundColor: "#eaeaea", color: "#000", float: 'right' }}>Close</Button>
             {/* <Button style={{ backgroundColor: "#000", border: "none", marginLeft: "1rem" }} color="primary"
              onClick={(step) => this.initNextStepHandler('gotoCreateNew')}>Next</Button> */}
            </div>
           </Modal>
          )
        }
      }
  }

  render() {

    return (
      <div className="nav__container">
      {this.renderWelcomeModal()}
      <h3 className="nav__tictalk">TicTalk</h3>
         <nav className="nav__nav">
            <ul className="nav__navcontainer">
               <li className="nav__navItems">{this.state.isAuth ? this.state.user : '' }</li>
               {this.state.isAuth ? <li onClick={this.logoutHandler} className="nav__navItems">Logout</li> : <li className="nav__navItems"><a href="/auth" style={{ padding: 'inherit', textDecoration: 'none', color: 'inherit'}}>Login</a></li> }
            </ul>
         </nav>
      </div>
    )
}

}

export default withRouter(TopNav);
