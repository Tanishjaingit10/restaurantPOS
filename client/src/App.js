import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import {Route} from 'react-router-dom';
import AboutUs from './components/AboutUs';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Navbar />
      <Route exact path='/'>
      <Home /></Route>
      <Route path='/aboutus'>
      <AboutUs /></Route>
      <Route path='/signup'>
      <SignUp /></Route>
      <Route path='/login'>
      <Login /></Route>
      
    </div>
  )
}

export default App

