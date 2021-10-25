import React from 'react'
import './App.css';
import Home from './components/Home'
import {Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Menu from './components/Menu';
import CategoryForm from './components/CategoryForm';
import ItemForm from './components/ItemForm';
import CategoryDisplay from './components/CategoryDisplay';
import ItemDisplay from './components/ItemDisplay';
import Tables from './components/Tables';
import Pos from './components/Pos';
import TableForm from './components/TableForm';

function App() {
  return (
    <div>
     
      {/* <Route exact path='/'>
      <Landing /></Route> */}
      <Route exact path='/home'>
      <Home /></Route>
      <Route exact path='/'>
      <SignUp /></Route>
      <Route exact path='/login'>
      <Login /></Route>
      <Route exact path='/menu'>
      <Menu /></Route>
      <Route exact path='/categorydisplay/:id'>
        <CategoryDisplay />
      </Route>
      <Route exact path='/addcategory'>
        <CategoryForm />
      </Route>
      <Route exact path='/editcategory/:id'>
        <CategoryForm />
      </Route>
      <Route exact path='/additem'>
        <ItemForm />
      </Route>
      <Route exact path='/itemdisplay/:id'>
        <ItemDisplay />
      </Route>
      <Route exact path='/tables'>
        <Tables />
      </Route>
      <Route exact path='/pos'>
        <Pos />
      </Route>
      <Route exact path='/addTable'>
        <TableForm />
      </Route>
    </div>
  )
}

export default App

