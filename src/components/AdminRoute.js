import React from "react";

import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const checkIfAdmin = () => {
  const user = JSON.parse(localStorage.getItem("ipf-user"));

  if (user && user.role === "admin") return true;
  return false;
};
const checkAuthStatus = () => {
  const token = localStorage.getItem("x-access-token");
  if (!token) {
    //   this.props.setAuthStatus(false);
    return false;
    // return window.location.href = '/login';
  }
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    return false;
    // return window.location.href = '/login';
  } else {
    return true;
  }
};
const AdminRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuthStatus() ? (
        checkIfAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" {...props} />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default AdminRoute;
