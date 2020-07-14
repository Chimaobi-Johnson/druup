import React from 'react';
import TopNav from '../Navigation/TopNav';
import { Button, Label, Input } from 'reactstrap';
import InfoCard from "../../components/Card/InfoCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import './WriteComment.css';

class WriteComment extends React.Component {

  state = {
    textValue: '',
    sending: false,
    sendingSuccess: false,
    sendingFailed: false
  }

  changeTextHandler = (event) => {
    let text = event.target.value;
    if(this.state.textValue.length > 250) {
      alert("You have reached the maximum amount of text");
      let currentVal = text.slice(0, text.length -1);
      this.setState({ textValue: currentVal });
    }
    this.setState({ textValue: event.target.value });
  }

  submitCommentHandler = async () => {
     const userId = window.location.pathname.split("/")[3];
     if(this.state.textValue.length < 1) {
       alert("Text field cannot be empty");
       return;
     }
     this.setState({ sending: true });
     const formData = {
       userId: userId,
       text: this.state.textValue
     }
     const response = await axios.post("/api/comment", formData);
     try {
       if(response) {
         console.log(response);
         this.setState({ sendingSuccess: true, sendingFailed: false, sending: false });
       }
     } catch (err) {
       console.log(err);
       this.setState({ sendingFailed: true, sendingSuccess: false, sending: false });
     }
  }

  render() {
     return (
       <div className="writecomment__container">
          <div className="infocard__wrapper">
              <InfoCard>
                <div className="infocard__inner">
                 <h2>Say Something</h2>
                   <Label for="textarea">Say something about me*</Label>
                   <Input type="textarea" value={this.state.textValue} onChange={this.changeTextHandler} name="text" placeholder="200 characters remaining" id="textarea" />
                   <Button onClick={this.submitCommentHandler} className="writecomment__button">{ this.state.sending ? 'Sending Message...' : 'Send Message' }<FontAwesomeIcon icon={faPaperPlane} size="sm" /></Button>
                </div>
              </InfoCard>
          </div>
       </div>
     )
  }

}

export default WriteComment;
