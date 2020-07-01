import React, { Component } from 'react';
import Header from '../headerFooter/header';
import SideBar from './sidebar';

class Dashboard extends Component {
  render() {
    return (
      <div>
          <div className="app-header">
             <Header />
          </div>
          <div className="app-container mdk-header-layout__content">
              <div class="mdk-drawer-layout js-mdk-drawer-layout" data-push data-responsive-width="992px">
                {this.props.children}
                <SideBar />
              </div>
                {/* <SideBar />
            <div className="app-wrapper">
                
            </div> */}
          </div>
          
      </div>
    );
  }
}

export default Dashboard;