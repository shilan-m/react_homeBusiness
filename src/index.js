import React from 'react';
import ReactDOM from 'react-dom';
import contactLogo from './contact.png'
import Product from './product'
import './index.css';

function TopHeader() {
  return(
    <div id="topHeader"> 
      <h1> LiuBao Jewerry</h1>
      <label>We are better than yesterday</label>
      {/* <br/>
      <img src={contactLogo} alt = "contactLogo"/> */}
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


 