import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

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

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuthStatus() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" {...props} />
      )
    }
  />
);

export default ProtectedRoute;
