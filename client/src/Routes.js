import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewAttendance from "./components/Attendance.js/ViewAttendance";
import Customers from "./components/Customers";
import Dashboard from "./components/Dashboard/Dashboard";
import Kitchen from "./components/Kitchen";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import Pos from "./components/PosContainer.js/Pos";
import Reservations from "./components/Reservations";
import Sales from "./components/Sales";
import SignUp from "./components/SignUp";
import Split from "./components/Split";
import Tables from "./components/Tables";
import Takeaways from "./components/Takeaways";
import Attendance from "./components/Attendance.js/Attendance";

import { DefaultLayout } from './layouts/DefaultLayout';

function RouteWrapper({
    component: Component, 
    layout: Layout, 
    ...rest
}) {
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}

const Routes = () => {
  return (
      <Router>
          <Switch>
                <Route exact path="/" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <RouteWrapper layout={DefaultLayout} exact path="/dashboard" component={Dashboard} />
                <RouteWrapper layout={DefaultLayout} exact path="/menu" component={Menu}/>
                <RouteWrapper layout={DefaultLayout} exact path="/tables" component={Tables} />
                <RouteWrapper layout={DefaultLayout} exact path="/pos" component={Pos} />
                <RouteWrapper layout={DefaultLayout} exact path="/orders" component={Orders} />
                <RouteWrapper layout={DefaultLayout} exact path="/kitchen" component={Kitchen} />
                <RouteWrapper layout={DefaultLayout} exact path="/customers" component={Customers} />
                <RouteWrapper layout={DefaultLayout} exact path="/sales" component={Sales} />
                <RouteWrapper layout={DefaultLayout} exact path="/attendance" component={Attendance} />
                <RouteWrapper layout={DefaultLayout} exact path="/viewAttendance" component={ViewAttendance} />
                <RouteWrapper layout={DefaultLayout} exact path="/takeaways" component={Takeaways} />
                <RouteWrapper layout={DefaultLayout} exact path="/reservations" component={Reservations} />
                <RouteWrapper layout={DefaultLayout} exact path="/split" component={Split} />
          </Switch>
      </Router>
  );
};

export default Routes;
