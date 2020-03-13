import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './pages/main';
import Box from './pages/Box/';
import Boxes from './pages/boxes'

const Routes = () => (
    <Router>
    <div>
      <Route exact path="/" component={Main}></Route>
      <Route path="/box/:id" component={Box}></Route>
      <Route path="/boxes" component={Boxes}></Route>
      
    </div>
  </Router>


);

export default Routes; 