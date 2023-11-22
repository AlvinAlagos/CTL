import React from "react";
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultNavbar from "./navbars/DefaultNavbar";

import GlobalStyles from "../GlobalStyles";
import LogIn from "./loginSignupPages/LogIn";
import Signup from "./loginSignupPages/Signup";


function App() {
  
  return (
    <React.Fragment>
        <GlobalStyles/>
        <Router>        
        <DefaultNavbar/>
            <Routes>
                <Route path="/login" element={<LogIn/>} />
                <Route path="/signup" element={<Signup/>} />
            </Routes>
        </Router>
    </React.Fragment>
  );
}

export default App;
