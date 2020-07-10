import React, { Component } from 'react';
import { Modal, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import './TopNav.css';

class TopNav extends Component {

  state = {
    modalOpen: true
  }

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
      <Modal isOpen={this.state.modalOpen} toggle={this.handleOpen}>
        <div className="welcomeModal">
        <h5>>Welcome! UserName </h5>
        <p>Click next to get a quick guide on how to get started</p>
        <Button>Skip</Button>
        <Button color="primary" onClick={(step) => this.initNextStepHandler('gotoCreateNew')}>Next</Button>
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
               <li className="nav__navItems">UserName</li>
               <li className="nav__navItems">Logout</li>
            </ul>
         </nav>
      </div>
    )
}

}

export default withRouter(TopNav);
