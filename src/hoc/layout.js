import React, { Component } from 'react';
import Loader from '../components/Loader';
import { connect } from "react-redux";
import * as actions from "../redux/actions";

class Layout extends Component {
  render() {
    return (
      <div>
          {this.props.children}
        {
          this.props.isLoading ? 

          <Loader /> : null
        }  
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {UI: {isLoading}} = state;
  return {isLoading}
}

export default connect(mapStateToProps, actions)(Layout);
