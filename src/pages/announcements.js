import React, { Component } from 'react';
import Dashboard from '../hoc/dashboard';
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { db } from "../database";
import AnnouncementCard from "../components/announcementCard";

class Announcements extends Component {
    state = {
        notifications: [],
        sortBy: '1'
    }
    componentDidMount(){
        this.props.setActiveLink('announcements')
        
        this.getAnnouncements()
    }
    
    getAnnouncements = () => {
        const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode'];
        db.collection('notifications').where('schoolCode', '==', schoolCode).onSnapshot(this.onDocmentSnapshot)
    }
    onDocmentSnapshot = (doc) => {
        if(!doc.empty){
            const data = [];
            doc.docs.forEach(notificationDoc => {
                data.push({
                    id: notificationDoc.id,
                    ...notificationDoc.data()
                })
            })
            data.sort(this.sortDescending)
            this.setState({
                notifications: [...data]
            })
        }
    }
    sortDescending = (a,b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.validUntil) - new Date(a.validUntil);
      }
      sortAscending = (a,b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.validUntil) - new Date(b.validUntil);
      }
      handleOnChange = e => {
          const {target: {name, value}} = e;
          this.setState({
              [name]: value
          }, () => {
              if(this.state.sortBy === '1'){
                  this.setState({
                      notifications: [...this.state.notifications.sort(this.sortDescending)]
                  })
              }else{
                this.setState({
                    notifications: [...this.state.notifications.sort(this.sortAscending)]
                })
              }
          })
      }
  render() {
    return (
      <Dashboard> 
          <div className="mdk-drawer-layout__content page">
            <div className="container-fluid page__heading-container">
                          <div className="page__heading d-flex align-items-center justify-content-between">
                              <h1 className="m-0">Announcements</h1>
                              {/* <Link to="#" className="btn btn-success ml-3">Go to Courses <i className="material-icons">arrow_forward</i></Link> */}
                          </div>
                          <form action="#" className="mb-5">
                            <div className="d-lg-flex">
                                <div className="search-form mb-3 mr-3-lg search-form--light">
                                    <input type="text" className="form-control" placeholder="Search Notification" id="searchSample02" />
                                    <button className="btn" type="button"><i className="material-icons">search</i></button>
                                </div>

                                <div className="form-inline  mb-3 ml-auto">
                                    <div className="form-group mr-3">
                                        <label for="custom-select" className="form-label mr-1">Sort By: </label>
                                        <select value={this.state.sortBy} name="sortBy" onChange={this.handleOnChange} id="custom-select" className="form-control custom-select" style={{width:200}} >
                                            {/* <option selected>All categories</option> */}
                                            <option value="1">Latest</option>
                                            <option value="2">Oldest</option>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                        </form>
            </div>
                <hr />
                <div className="container px-5">
                    <div className="row">

                        {
                            this.state.notifications.map(doc => {
                                return (
                                    <AnnouncementCard key={doc.id} id={doc.id}
                                    title={doc.type} target={doc.studentClass} message={''} />
                                )
                            })
                        }
                    </div>
                </div> 

          </div>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(Announcements);
