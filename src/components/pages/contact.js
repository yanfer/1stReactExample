import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactPageImg from "../../../static/assets/images/auth/login.jpg";

export default function(){
  return(
    <div className='contact-page-wrapper'>
      <div className='left-column' 
      style={{
        background: "url(" + ContactPageImg + ") no-repeat",
        backgroundSize: "cover",
      }}>

      </div>
      <div className='right-column'>

        <div className='contact-bullet-points'>

          <div className='bullet-point-group'>
              <div className='icon'> <FontAwesomeIcon icon='phone'/> </div>
              <div className='text'> 747-218-1822 </div>
          </div>

          <div className='bullet-point-group'>
            <div className='icon'> <FontAwesomeIcon icon='envelope'/> </div>
            <div className='text'> yanfer.araque@gmail.com </div>
          </div>

          <div className='bullet-point-group'>
            <div className='icon'> <FontAwesomeIcon icon='map-marked-alt'/> </div>
            <div className='text'> Chilpancingo, Gro. </div>
          </div>

        </div>
      </div>
    </div>
    );
}