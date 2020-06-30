import React, { Component } from "react";
import loader from "../assets/loader.svg";
class Loader extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading-wrapper">
          <img src={loader} alt="loader" />
        </div>
      </div>
    );
  }
}

export default Loader;