

import React, { Component } from 'react';
import { BrowserRouter as Router,} from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

import Root from "./Root";
// import Loader from './components/Loader';
import { connect } from 'react-redux';
import Layout from './hoc/layout';
import * as actions from "./redux/actions";
import { auth } from "./database";

class AppRoot extends Component {
    INITIAL_STATE = {authenticated: false};
  constructor(props){
    super(props);
    this.state = {...this.INITIAL_STATE}
  }
  componentDidMount(){
    this.authListener()
  }

  authListener() {
    const user = auth().currentUser;
    if(user){
      this.setState({
        authenticated: true
      })
    }else{
      this.setState({
        authenticated: false
      })
    }
    auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          authenticated: true
        })
      }else{
        this.setState({
          authenticated: false
        })
      }
    })
  }
  render() {
    return (
        <div className="App" style={{position:'relative'}}>
            <div className="">
              
                <Router>
                {/* <Navbar /> */}
                  <Layout>
                    <Root  authenticated={this.state.authenticated} />
                
                  </Layout>
                </Router>
              
            </div>
           {/* {
               this.props.loading ? <Loader /> : null
           }  */}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, actions)(AppRoot);