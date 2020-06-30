import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Register from "./pages/register";
import AuthRoute from "./components/AuthRoute";
import LoginStudent from "./pages/loginStudent";
// import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";
// import DashBoard from './hoc/Dashboard';
// import Layout from './hoc/layout';

class Root extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute 
            exact
            path="/"
            component={Home}
            authenticated={this.props.isAuthenticated}
        />
        <AuthRoute
          exact
          path="/register"
          component={Register}
          authenticated={this.props.isAuthenticated}
        />
        <AuthRoute
          exact
          path="/student/login"
          component={LoginStudent}
          authenticated={this.props.isAuthenticated}
        />
        {/* <AuthRoute
          exact
          path="/signup"
          component={Signup}
          authenticated={this.props.isAuthenticated}
        /> */}
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, null)(Root);
