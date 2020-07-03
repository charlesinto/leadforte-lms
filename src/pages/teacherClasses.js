import React, { Component } from 'react';
import Dashboard from '../hoc/dashboard';
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { db, auth } from "../database";
import ClassCard from '../components/classCard';

class TeacherClasses extends Component {
    state = {
        notifications: [],
        sortBy: '1'
    }
    componentDidMount(){
        this.props.setActiveLink('classroom')
        
        this.getTeacherProfile()
    }
    
    getTeacherProfile = () => {
        const uid = auth().currentUser.uid;
        db.collection('teachers').where('uid', '==', uid).onSnapshot(this.onDocmentSnapshot)
    }
    onDocmentSnapshot = (doc) => {
        if(!doc.empty){
            const data = [];
            doc.docs.forEach(teacherDoc => {
                data.push({
                    id: teacherDoc.id,
                    ...teacherDoc.data()
                })
            })
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
      onClassSelected = (className) => {
          this.props.selectedClass(className)
          this.props.history.push('/instructor/chatroom')
      }
  render() {
    return (
      <Dashboard> 
          <div className="mdk-drawer-layout__content page">
            <div className="container-fluid page__heading-container">
                          <div className="page__heading d-flex align-items-center justify-content-between">
                              <h1 className="m-0">Your Classes</h1>
                              {/* <Link to="#" className="btn btn-success ml-3">Go to Courses <i className="material-icons">arrow_forward</i></Link> */}
                          </div>
                          <form action="#" className="mb-5">
                            <div className="d-lg-flex">
                                <div className="search-form mb-3 mr-3-lg search-form--light">
                                    <input type="text" className="form-control" disabled placeholder="Search Class" id="searchSample02" />
                                    <button className="btn" type="button"><i className="material-icons">search</i></button>
                                </div>

                                
                            </div>
                        </form>
            </div>
                <hr />
                <div className="container px-5">
                    <div className="row">

                        {
                           this.state.notifications[0] ? this.state.notifications[0].classes.map((doc, i) => {
                                return (
                                    <ClassCard key={i} className={doc.class} selectedClass={this.onClassSelected} />
                                )
                            }) : null
                        }
                    </div>
                </div> 

          </div>
        </Dashboard>
    );
  }
}

const mapStateToProps = state => {
    const {UI: {className}} = state;
    return {
        className
    }
}

export default connect(mapStateToProps, actions)(TeacherClasses);
