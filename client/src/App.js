import React from 'react'
import './App.css';
import Home from './components/Home'
import {Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Landing from './components/Landing';

function App() {
  return (
    <div>
     
      <Route exact path='/'>
      <Landing /></Route>
      <Route exact path='/home'>
      <Home /></Route>
      <Route exact path='/signup'>
      <SignUp /></Route>
      <Route exact path='/login'>
      <Login /></Route>
      
    </div>
  )
}

export default App

