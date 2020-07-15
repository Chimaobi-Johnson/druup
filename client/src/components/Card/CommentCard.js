import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import * as classes from './CommentCard.module.css';





const CommentCard = props => {
  const {
    buttonLabel,
    className,
    commentText,
    eyeView
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const renderModal = (
    <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Anonymous</ModalHeader>
        <ModalBody>
          {commentText}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
  )

  return (
    <div className={classes.CommentCardContainer}>
      {renderModal}
       <h4>Comments</h4>
       <p>{commentText}</p>
       {/* <span>&larr;</span><span>&rarr;</span> */}
       { eyeView ? <p onClick={toggle}><FontAwesomeIcon icon={faEye} /></p> : null }
    </div>
  )
}


export default CommentCard;
