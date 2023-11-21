import React from "react";
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultNavbar from "./DefaultNavbar";
import LogIn from "./LogIn";
import GlobalStyles from "../GlobalStyles";
function App() {
  return (
    <React.Fragment>
        <GlobalStyles/>
        <Router>        
        <DefaultNavbar/>
            <Routes>
                <Route path="/" element={<LogIn/>} />
            </Routes>
        </Router>
    </React.Fragment>
  );
}

export default App;
