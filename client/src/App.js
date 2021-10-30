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
import Pos from './components/PosContainer.js/Pos';
import TableForm from './components/TableForm';
import CategoryList from './components/PosContainer.js/CategoryList';
import Payment from './components/PosContainer.js/Payment';
import Cash from './components/PosContainer.js/Cash';
import Discount from './components/PosContainer.js/Discount';

function App() {
  return (
    <div>
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
      <Route exact path='/categoryList'>
        <CategoryList />
      </Route>
      <Route exact path='/payments'>
        <Payment />
      </Route>
      <Route exact path='/cash'>
        <Cash />
      </Route>
      <Route exact path='/discount'>
        <Discount />
      </Route>
      
    </div>
  )
}

export default App

