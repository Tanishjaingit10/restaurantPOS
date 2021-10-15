import React from 'react'
import './App.css';
import Home from './components/Home'
import {Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Landing from './components/Landing';
import Menu from './components/Menu';
import CategoryForm from './components/CategoryForm';
import ItemForm from './components/ItemForm';


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
      <Route exact path='/menu'>
      <Menu /></Route>
      <Route exact path='/addcategory'>
        <CategoryForm />
      </Route>
      <Route exact path='/additem'>
        <ItemForm />
      </Route>
      
    </div>
  )
}

export default App

