import React, { Component } from 'react';
import Dashboard from '../hoc/dashboard';
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { db, auth } from "../database";
import AnnouncementCard from "../components/announcementCard";
import Swal from 'sweetalert2';

class TeacherAnnouncement extends Component {
    state = {
        notifications: [],
        sortBy: '1',
        classes: [],
        target: '',
        message: ''
    }
    componentDidMount(){
        this.props.setActiveLink('teacherAnnoucement')
        
        this.getAnnouncements()
        this.getTeacherClasses()
    }
    getTeacherClasses =  () => {
        const uid =  (auth().currentUser).uid
        db.collection('teachers').where('uid', '==', uid).onSnapshot(doc => {
            if(!doc.empty){
                const classes = doc.docs[0].data()['classes']
                this.setState({
                    classes
                })
            }
        })
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
      toggleModal = () => {
          window.$('#anouncementModal').modal('show')
      }
      sendAnnoucement = async () => {
          const {target, message} = this.state;
          if(target.trim() === '' || message.trim() === ''){
              return Swal.fire('Message and Class is required')
              
          }
          const uid = auth().currentUser.uid;
          window.$('#anouncementModal').modal('hide')
          this.props.initiateLoading(true)
          const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode'];
          await db.collection('notifications').add({
              type: 'Teacher Notification',
              target,
              message,
              createdBy: uid,
              createdAt: new Date(),
              schoolCode
          })
          this.props.initiateLoading(false)
          Swal.fire(
            'Good job!',
            'You have sent notification',
            'success'
          ).then((value) => {
            //   this.props.history.goBack()
          })
      }
  render() {
    return (
      <Dashboard> 
          <div className="mdk-drawer-layout__content page">
            <div className="container-fluid page__heading-container" style={{position:'relative'}}>
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

                <div onClick={this.toggleModal} className="fab-wrapper" title="Make an announcement">
                    <div className="fab-container shadow d-flex justify-content-center align-items-center">
                            <span>
                                <i className="fas fa-bullhorn"></i>
                            </span>
                    </div>
                </div>
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

                <div class="modal fade" data-backdrop="static" data-keyboard="false" id="anouncementModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Make Announcement</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form action="#" className="mb-5">
                                <div className="">
                                    

                                    <div className="mb-3 ml-auto">
                                            <div className="form-group">
                                                <label className="text-label" htmlFor="phoneNumber">Select Class</label>
                                                <div className="input-group input-group-merge">
                                                    <select value={this.state.target} name="target" onChange={this.handleOnChange} id="custom-select" className="form-control custom-select" style={{width:200}} >
                                                                                {/* <option selected>All categories</option> */}
                                                                                <option selected>Choose</option>
                                                            {
                                                                this.state.classes.map(item => {
                                                                    return <option value={item.class}>{item.class}</option>
                                                                })
                                                            }
                                                        </select>
                                                </div>
                                            </div>
                                        
                                    </div>
                                    <div className="mb-3 ml-auto">
                                        <div className="form-group">
                                            <label className="text-label" htmlFor="message">Message</label>
                                            <div className="input-group input-group-merge d-flex flex-column">
                                                <textarea name="message" value={this.state.message} onChange={this.handleOnChange} className="form-control custom-select" maxLength="500"></textarea><br />
                                                <span>Maximum length of 500 characters</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </form>
                        </div>  
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.sendAnnoucement} class="btn btn-primary">Send</button>
                        </div>
                        </div>
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

export default connect(mapStateToProps, actions)(TeacherAnnouncement);
