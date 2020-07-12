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
    textValue: ''
  }

  changeTextHandler = (event) => {
    if(this.state.textValue.length > 250) {
      alert("You have reached the maximum amount of text");
      return;
    }
    this.setState({ textValue: event.target.value });
  }

  submitCommentHandler = async () => {
     const userId = window.location.pathname.split("/")[3];
     if(this.state.textValue.length < 1) {
       alert("Text field cannot be empty");
       return;
     }
     const formData = new FormData;
     formData.append("text", this.state.textValue);
     formData.append("userId", userId);
     const response = await axios.post("/api/comment", formData);
     try {
       if(response) {
         console.log(response);
       }
     } catch (err) {
       console.log(err);
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
                   <Button onClick={this.submitCommentHandler} className="writecomment__button">Send Message <FontAwesomeIcon icon={faPaperPlane} size="sm" /></Button>
                </div>
              </InfoCard>
          </div>
       </div>
     )
  }

}

export default WriteComment;
