

import React, { Component } from 'react';
import { BrowserRouter as Router,} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Root from "./Root";
// import Loader from './components/Loader';
import { connect } from 'react-redux';
import Layout from './hoc/layout';
import * as actions from "./redux/actions";

class AppRoot extends Component {
    INITIAL_STATE = {authenticated: false};
  constructor(props){
    super(props);
    this.state = {...this.INITIAL_STATE}
  }
  componentDidMount(){
  }

  checkAuthStatus = async () => {
    const token = localStorage.getItem('x-access-token')
    const user = localStorage.getItem('ipf-user');
    if(!user || !token){
      this.props.setAuthStatus(false);
      return this.setState({authenticated: false})
      // return window.location.href = '/login';
      
    }
    const decodedToken = jwtDecode(token)
  
    if(decodedToken.exp * 1000 < Date.now()){
      this.props.setAuthStatus(false);
      this.setState({authenticated: false})
      // return window.location.href = '/login';
    }else{
      this.props.setAuthStatus(true);
      this.setState({authenticated: true})
    }
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