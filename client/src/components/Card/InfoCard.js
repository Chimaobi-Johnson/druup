import React from 'react';

import * as classes from './InfoCard.module.css';


const InfoCard = props => (
   <div className={classes.InfoCardWrapper}>
      <div className={classes.InfoCardInner}>
          {props.children}
      </div>
   </div>
)

export default InfoCard;
