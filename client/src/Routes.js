import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CategoryDisplay from "./components/CategoryDisplay";
import CategoryForm from "./components/CategoryForm";
import Home from "./components/Home";
import ItemDisplay from "./components/ItemDisplay";
import ItemForm from "./components/ItemForm";
import Login from "./components/Login";
import Menu from "./components/Menu";
import AddCustomer from "./components/PosContainer.js/AddCustomer";
import Cash from "./components/PosContainer.js/Cash";
import CategoryList from "./components/PosContainer.js/CategoryList";
import Discount from "./components/PosContainer.js/Discount";
import Payment from "./components/PosContainer.js/Payment";
import Pos from "./components/PosContainer.js/Pos";
import SignUp from "./components/SignUp";
import TableForm from "./components/TableForm";
import Tables from "./components/Tables";

const Routes = () => {
  return (
    
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/categorydisplay/:id" component={CategoryDisplay} />
          <Route exact path="/addcategory" component={CategoryForm} />
          <Route exact path="/editcategory/:id" component={CategoryForm} />
          <Route exact path="/additem" component={ItemForm} />
          <Route exact path="/itemdisplay/:id" component={ItemDisplay} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/pos" component={Pos} />
          <Route exact path="/addTable" component={TableForm} />
          <Route exact path="/categoryList" component={CategoryList} />
          <Route exact path="/payments" component={Payment} />
          <Route exact path="/cash" component={Cash} />
          <Route exact path="/discount" component={Discount} />
          <Route exact path="/newCustomer" component={AddCustomer} />
        </Switch>
      </Router>
    
  );
};

export default Routes;
