import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/Home"
import About from './components/About';
import Userlogin from './components/Userlogin';
import Contact from './components/Contact';
import Userdashboard from './components/Userdashboard';
import Dataformfilling from './components/Dataformfilling';
import ViewDataform from './components/ViewDataform';
import Updateformfilling from './components/Updateformfilling';
import Usersignup from './components/Usersignup';
import Userforgotpassword from './components/Userforgotpassword';
import Mailsentmsg from './components/Mailsentmsg';
import Resetpassword from './components/Resetpassword';
import Adminuiusercard from './components/Adminuiusercard';
import Admincontrolpanel from './components/Admincontrolpanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/forgotpassword" element={<Userforgotpassword />} />
        <Route path="/forgotpassword-waiting" element={<Mailsentmsg/>}/>
        <Route path="/resetpassword/:token/:email" element={<Resetpassword/>}/>
        <Route path="/signup" element={<Usersignup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/userdashboard/:id" element={<Userdashboard/>} />
        <Route path="/dataformfilling/:id" element={<Dataformfilling/>} />
        <Route path="/data/view/:id"  element={<ViewDataform/>}/>
        <Route path="/data/edit/:id" element={<Updateformfilling/>}/>
        <Route path="/adminlogin/:id" element={<Adminuiusercard />} />
        <Route path="/admincontrolpanel/:id" element={<Admincontrolpanel />} />
      </Routes>
    </Router>
  );
}

export default App;

