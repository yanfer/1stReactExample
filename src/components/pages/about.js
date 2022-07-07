import React from 'react';
import profilePicture from "../../../static/assets/images/bio/headshot.jpg"

export default function(){
  return(
    <div className='content-page-wrapper'>
      <div className='left-column' 
      style={{
        background: "url(" + profilePicture + ") no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "0px -250px",
      }}>

      </div>
      <div className='right-column'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Eos omnis alias incidunt. Nobis libero quae, laborum magnam earum totam. 
        Quos quod cupiditate iste aspernatur quas hic officia sed dolorum sint dolore. 
        Nam repellat, minus, eveniet consectetur voluptatibus alias maxime unde, 
        similique facere soluta adipisci! Aliquam nam ipsum esse porro et?
      </div>
    </div>
    );
}