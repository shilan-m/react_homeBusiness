import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import contactLogo from './contact.png'
import Product from './product'

function TopHeader() {
  return(
    <div> 
      <label> LiuBao Jewerry</label>
      <br/>
      <label>the best jewerry factory</label>
      <br/>
      <img src={contactLogo} alt = "contactLogo"/>
    </div>
  )
}
function MainBody() {
  return (
    <React.Fragment>
      <TopHeader />
      <Product />
    </React.Fragment>
  )
}



  
  ReactDOM.render(
    <MainBody />,
    document.getElementById('root')
  );


 