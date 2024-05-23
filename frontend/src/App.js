import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/Home"
import About from './components/About';
import Userlogin from './components/Userlogin';
import Contact from './components/Contact';
import Userdashboard from './components/Userdashboard';
import Dataformfilling from './components/Dataformfilling';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/userdashboard/:id" element={<Userdashboard/>} />
        <Route path="/dataformfilling/:id" element={<Dataformfilling/>} />
        
      </Routes>
    </Router>
  );
}

export default App;

