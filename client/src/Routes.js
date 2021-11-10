import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CategoryDisplay from "./components/CategoryDisplay";
import CategoryForm from "./components/CategoryForm";
import Counter from "./components/Counter";
import Home from "./components/Home";
import ItemDisplay from "./components/ItemDisplay";
import ItemForm from "./components/ItemForm";
import Kitchen from "./components/Kitchen";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import AddCustomer from "./components/PosContainer.js/AddCustomer";
import Cash from "./components/PosContainer.js/Cash";
import CashPay from "./components/PosContainer.js/CashPay";
import CategoryList from "./components/PosContainer.js/CategoryList";
import CustomerDetails from "./components/PosContainer.js/CustomerDetails";
import Discount from "./components/PosContainer.js/Discount";
import FinalPay from "./components/PosContainer.js/FinalPay";
import Payment from "./components/PosContainer.js/Payment";
import Pos from "./components/PosContainer.js/Pos";
import ViewOrder from "./components/PosContainer.js/ViewOrder";
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
          <Route exact path="/editcustomer/:id" component={AddCustomer} />
          <Route exact path="/customerDetails/:id" component={CustomerDetails} />
          <Route exact path="/finalPay" component={FinalPay} />
          <Route exact path="/cashPay" component={CashPay} />
          <Route exact path="/viewOrder" component={ViewOrder} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/kitchen" component={Kitchen} />
        </Switch>
      </Router>
    
  );
};

export default Routes;
