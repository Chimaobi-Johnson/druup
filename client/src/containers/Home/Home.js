import React from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CommentCard from '../../components/Card/CommentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import TopNav from "../Navigation/TopNav";
import axios from "axios";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
import './Home.css';

class Home extends React.Component {

  state = {
    shareModal: false,
    shareText: '',
    editShareText: '',
    comments: []
  }


  componentDidMount () {
    const userId = localStorage.getItem('userId');
    this.fetchComments(userId);
    if(!userId) {
      // alert("You need to login before proceeding!");
      this.props.history.push("/auth");
    }
    // const userName = localStorage.getItem('username');
    const url = window.location.origin;
    const shareText = `Follow this link to say something about me anonymously... ${url}/user/write-comment-about-me/${userId}`;
    this.setState({ shareText });
  }

  async fetchComments (userId) {
     const response = await axios.post("/api/comments", { userId });
     try {
       if(response) {
         console.log(response)
         this.setState({ comments: response.data.comments });
       }
     } catch (err) {
       console.log(err);
     }

  }

  toggleShareModal = () => {
     this.setState({ shareModal: !this.state.shareModal })
  }

  initShareModal = () => {
    this.setState({ shareModal: true })
  }

  displayShareButtons = () => {
    document.querySelector('.share__buttons').style.display = 'block';
    document.querySelector('#shareBtn').style.display = 'none';
  }

  initEditingMode = () => {
    this.setState({ editShareText: !this.state.editShareText });
  }

  changeTextHandler = event => {
    this.setState({ shareText: event.target.value });
  }

  renderShareText () {
    if(this.state.editShareText) {
      return (<Input type="textarea"
       value={this.state.shareText}
       onChange={this.changeTextHandler}
       id="linkInput"
      />)
    }
    return <p id="linkInput">{this.state.shareText}</p>
  }

  copyTextHandler = () => {
   let copyText = document.getElementById("linkInput").innerHTML;
   console.log(copyText);
   // copyText.select();
   // copyText.setSelectionRange(0, 99999); /*For mobile devices*/
   document.execCommand("copy");
   alert("Copied text: " + copyText.value + "copytext " + copyText);
  }

  renderShareModal () {
    return (
      <Modal style={{ transition: 'all .5s'}} isOpen={this.state.shareModal} fade={false} toggle={this.toggleShareModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleShareModal}>SHARE YOUR LINK</ModalHeader>
          <ModalBody>
           <div className="share__box">
            <p>
            <span style={{ color: 'blue', cursor: 'pointer', marginBottom: '.5rem' }} onClick={this.initEditingMode}>{this.state.editShareText ? 'Save' : 'Edit'}</span>
            | <span style={{ color: 'blue', cursor: 'pointer', marginBottom: '.5rem' }} onClick={this.copyTextHandler}>Copy link</span></p>
             <br />
            {this.renderShareText()}
            <div className="share__buttons">
              <p>Share with </p>
               <FacebookShareButton url={this.state.shareText}><FacebookIcon size={32} round={true} /></FacebookShareButton>
               <WhatsappShareButton url={this.state.shareText}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
               <InstapaperShareButton url={this.state.shareText}><InstapaperIcon size={32} round={true} /></InstapaperShareButton>
               <LinkedinShareButton url={this.state.shareText}><LinkedinIcon size={32} round={true} /></LinkedinShareButton>
               <RedditShareButton url={this.state.shareText}><RedditIcon size={32} round={true} /></RedditShareButton>
               <TelegramShareButton url={this.state.shareText}><TelegramIcon size={32} round={true} /></TelegramShareButton>
               <TwitterShareButton url={this.state.shareText}><TwitterIcon size={32} round={true} /></TwitterShareButton>
               <EmailShareButton url={this.state.shareText}><EmailIcon size={32} round={true} /></EmailShareButton>
            </div>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button id="shareBtn" onClick={this.displayShareButtons} color="primary">Share</Button>
            <Button color="secondary" onClick={this.toggleShareModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
    )
  }

  initNextStepHandler = (step) => {
    if(step === 'gotoSecondStep') {
     const prevCallout = document.getElementById('homeShareInfo');
     const prevBackdrop = document.getElementById('homeShareInfoBackdrop');
     const backdrop = document.getElementById('secondModalBackdrop');
     const callout = document.getElementById('secondModal');
     prevCallout.style.display = 'none';
     prevBackdrop.style.display = 'none';
     backdrop.style.display = 'block';
     callout.style.opacity = 1;
     callout.style.display = 'block';
   } else if(step === 'gotoThirdStep') {
     const prevBackdrop = document.getElementById('secondModalBackdrop');
     const prevCallout = document.getElementById('secondModal');
     const backdrop = document.getElementById('secondModalBackdrop');
     const callout = document.getElementById('thirdModal');
     prevCallout.style.display = 'none';
     prevBackdrop.style.display = 'none';
     backdrop.style.display = 'block';
     callout.style.opacity = 1;
     callout.style.display = 'block';
  }

  }

  renderCommentsArea () {
    if(this.state.comments.length === 0) {
       return <CommentCard commentText="Comments about you will be displayed here. CLICK ON SHARE BUTTON BELOW TO GET STARTED!" eyeView={false} />
    } else {
       return this.state.comments ? this.state.comments.map(comment => <CommentCard commentText={comment} eyeView={true} />) : <div>Loading</div>;
    }
  }

  render() {
     return (
       <div className="home__container">
       <TopNav  isAuth={this.state.isAuth} user={this.state.userName} />
         {this.renderShareModal()}
         <div className="home__contentbox">
         <div id="secondModalBackdrop" className="modal__backdrop"></div>
         <div id="secondModal" className="modal__description">
            <p>Once people starting commenting about you each persons opinions appear here...</p>
            <Button size="sm" onClick={(step) => this.initNextStepHandler('gotoThirdStep')} color="info">Next</Button>
         </div>
         <div id="thirdModal" className="modal__description2">
            <p>Click on the eye icon to preview and share on your social media...</p>
            <Button size="sm" onClick={(step) => this.initNextStepHandler('endTour')} style={{ backgroundColor: '#1a1919' }}>Next</Button>
         </div>
         {this.renderCommentsArea()}
         </div>
           <div className="home__sharecontainer">
             <div id="homeShareInfo" className="home__shareinfo">
             <p>
               Click on this button to share your profile to your friends
             </p>
               <Button size="sm" onClick={(step) => this.initNextStepHandler('gotoSecondStep')}>Next</Button>
             </div>
             <button onClick={this.initShareModal} className="sharelink__btn"><FontAwesomeIcon icon={faShare} /></button>
           </div>
           <div id="homeShareInfoBackdrop" className="home__shareinfobackdrop"></div>
       </div>
     )
  }

}

export default Home;
