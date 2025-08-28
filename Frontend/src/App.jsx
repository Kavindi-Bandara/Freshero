import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/Header.jsx";
import Footer from "./assets/Footer.jsx";
import Home from "./assets/Home.jsx";
import About from "./assets/AboutUs.jsx";
import LogIn from "./assets/LogIn.jsx";
import SignUp from "./assets/SignUp.jsx";
import Inventory from "./assets/Inventory.jsx";

function App(){
  return(

   <Router>
    <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/AboutUs" element={<About/>}/>
      <Route path="/Inventory" element={<Inventory/>}/>
    </Routes>
   </Router>

  )
}

export default App;