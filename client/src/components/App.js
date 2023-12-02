import React, { useState } from "react";
import {  BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import UserNavbar from "./navbars/UserNavbar";
import { RequireAuth } from 'react-auth-kit';
import {useAuthUser} from 'react-auth-kit'
import GlobalStyles from "../GlobalStyles";
import LogIn from "./loginSignupPages/LogIn";
import Signup from "./loginSignupPages/Signup";
import UserDashboard from "./dashboard/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import AdminNavbar from "./navbars/AdminNavbar";
import AdminProjectsPage from "./admin/pages/AdminProjectsPage";

function App() {
  const auth = useAuthUser();
  const userType = auth() === null ? 'User' :  auth().user;

  
  return (
    <React.Fragment>    
        <GlobalStyles/>
        <Router>        
          {userType === 'User' ? <UserNavbar auth={auth}/> :<AdminNavbar auth={auth}/> }
              <Routes>
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup" element={<Signup/>} />
                  { userType === 'Admin' 
                    ?(
                      <>
                        <Route path="/" element={ 
                          <RequireAuth loginPath={'/login'}><AdminDashboard/></RequireAuth>
                        }/>
                        <Route path="/projects" element={ 
                          <RequireAuth loginPath={'/login'}><AdminProjectsPage/></RequireAuth>
                        }/>
                      </>
                    )
                    :<Route path="/" element={ 
                      <RequireAuth loginPath={'/login'}><UserDashboard auth={auth}/></RequireAuth>
                    }/>
                  }
                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />
                </Routes>
        </Router>
    </React.Fragment>
  );
}

export default App;
