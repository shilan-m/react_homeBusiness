import React from 'react';
import ReactDOM from 'react-dom';
import Product from './product';
import Customers from './customer';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function TopHeader() {
  return(
    <div id="topHeader"> 
      <h1> LiuBao Jewerry</h1>
      <label>We are better than yesterday</label>
    </div>
  )
}
function App() {
  return (
    <React.Fragment>
      <TopHeader />
      <Routes>
        <Route path="products" element={<Product />} />
        <Route path="customers" element={<Customers />} />
      </Routes>
    </React.Fragment>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);


 