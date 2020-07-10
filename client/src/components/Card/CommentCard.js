import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import * as classes from './CommentCard.module.css';





const CommentCard = props => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const renderModal = (
    <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Anonymous</ModalHeader>
        <ModalBody>
          kjsdniu iusndiu isubdfisdfi ubsiudbshbiusf
          lsdjniosud isdhhsdb shduy usyd dyb ysudbs ushudbsu uys
          sdugsdy uysdysd ugaouin9hadi uzbvaibv8 fivbadfv iabv
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
       <h4>Anonymous</h4>
       <p>kjsdniu iusndiu isubdfisdfi ubsiudbshbiusf
       lsdjniosud isdhhsdb shduy usyd dyb ysudbs ushudbsu uys
       sdugsdy uysdysd ugaouin9hadi uzbvaibv8 fivbadfv iabv...</p>
       <span>&larr;</span><span>&rarr;</span>
       <p onClick={toggle}><FontAwesomeIcon icon={faEye} /></p>
    </div>
  )
}


export default CommentCard;
