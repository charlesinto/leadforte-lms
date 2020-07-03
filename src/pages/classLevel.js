import React, { Component} from 'react';
import Dashboard from "../hoc/dashboard";
import * as actions  from "../redux/actions";
import { connect } from "react-redux";

class ClassLevel extends Component{
    componentDidMount(){
        this.props.setActiveLink('studentCourses')
    }
    navigateToClass = (category) => {
        this.props.navigateToClass(category)
        console.log(category)
        this.props.history.push('/student/view-courses');
    }
    render(){
        return (
            <Dashboard>
                <div className="mdk-drawer-layout__content page">
                    <div className="container-fluid page__heading-container">
                        <div className="page__heading d-flex align-items-center justify-content-between">
                              <h1 className="m-0">Classes</h1>
                              {/* <Link to="#" className="btn btn-success ml-3">Go to Courses <i className="material-icons">arrow_forward</i></Link> */}
                          </div>
                    </div>
                    <hr className="my-4" />
                    <div className="container-fluid page__containe">
                        <div className="row">
                            <div className="col-md-4">
                                    <div className="card card-group-row__card">
                                    <div className="card-body py-3 d-flex flex-column">
                                        <p>
                                            <a className="px-2" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2">
                                                Primary School
                                            </a>
                                        </p>
                                        <div class="collapse" id="collapseExample2">
                                            <ul className="list-group">
                                                <li onClick={() => this.navigateToClass('1')} className="list-group-item">Primary One</li>
                                                <li onClick={() => this.navigateToClass('1')} className="list-group-item">Primary Two</li>
                                                <li onClick={() => this.navigateToClass('1')} className="list-group-item">Primary Three</li>
                                                <li onClick={() => this.navigateToClass('1')} className="list-group-item">Primary Four</li>
                                                <li onClick={() => this.navigateToClass('1')} className="list-group-item">Primary Five</li>
                                                <li onClick={() => this.navigateToClass('1')} className="list-group-item">Primary Six</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                    <div className="card card-group-row__card">
                                    <div className="card-body py-3 d-flex flex-column">
                                        <p>
                                            <a className="px-2" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                Junior Secondary School
                                            </a>
                                        </p>
                                        <div class="collapse" id="collapseExample">
                                            <ul className="list-group">
                                                <li onClick={() => this.navigateToClass('2')} className="list-group-item">JSS One</li>
                                                <li onClick={() => this.navigateToClass('2')} className="list-group-item">JSS Two</li>
                                                <li onClick={() => this.navigateToClass('2')} className="list-group-item">JSS Three</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                    <div className="card card-group-row__card">
                                    <div className="card-body py-3 d-flex flex-column">
                                        <p>
                                            <a className="px-2" data-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample2">
                                                Senior Secondary School
                                            </a>
                                        </p>
                                        <div class="collapse" id="collapseExample3">
                                            <ul className="list-group">
                                                <li onClick={() => this.navigateToClass('3')} className="list-group-item">SS One</li>
                                                <li onClick={() => this.navigateToClass('3')} className="list-group-item">SS Two</li>
                                                <li onClick={() => this.navigateToClass('3')} className="list-group-item">SS Three</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal" id="simplemodal" tabIndex="-1" role="dialog">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Select Class</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div className="container-fluid page__containe">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="card card-group-row__card">
                                                    <div className="card-body p-5 d-flex flex-column">
                                                        Primary One
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-group-row__card">
                                                    <div className="card-body p-5 d-flex flex-column">
                                                        Primary Two
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-group-row__card">
                                                    <div className="card-body p-5 d-flex flex-column">
                                                        Primary Three
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-group-row__card">
                                                    <div className="card-body p-5 d-flex flex-column">
                                                        Primary Four
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-group-row__card">
                                                    <div className="card-body p-5 d-flex flex-column">
                                                        Primary Five
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-group-row__card">
                                                    <div className="card-body p-5 d-flex flex-column">
                                                        Primary Six
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Dashboard>
        )
    }
}

export default connect(null, actions)(ClassLevel);