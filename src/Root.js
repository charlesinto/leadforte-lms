import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Login from "./pages/login";
import AuthRoute from "./components/AuthRoute";
// import ProtectedRoute from "./components/ProtectedRoute";
import { connect } from "react-redux";
// import AdminRoute from "./components/AdminRoute";
// import DashBoard from './hoc/Dashboard';
// import Layout from './hoc/layout';

class Root extends Component {
  render() {
    return (
      <Switch>
        <AuthRoute
          exact
          path="/login"
          component={Login}
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
