import React, { Component } from "react";
import Dashboard from "../hoc/dashboard";
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import DashboardFeaturedCourse from "../components/dashboardFeaturedCourseCard";
import DashboardListProgress from "../components/dashboardListProgress";
import DashboardMyQuiz from "../components/dashboardMyQuiz";
import { Link } from "react-router-dom";

class StudentDashboard extends Component{
    componentDidMount(){
        this.props.setActiveLink('studentDashboard')
    }
    render(){
        return (
            <Dashboard>
                <div className="mdk-drawer-layout__content page">



                    <div className="container-fluid page__heading-container">
                        <div className="page__heading d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-lg-between text-center text-lg-left">
                            <h1 className="m-lg-0">Student Dashboard</h1>
                            <div>
                                <Link to="#" className="btn btn-light ml-3"><i className="material-icons">edit</i> Edit</Link>
                                <Link to="#" className="btn btn-success ml-1">View Profile <i className="material-icons">account_circle</i></Link>
                            </div>
                        </div>
                    </div>





<div className="container-fluid page__container">

                    {/* <div className="alert alert-soft-warning d-flex align-items-center card-margin p-2" role="alert">
                        <i className="material-icons mr-3">error_outline</i>
                        <div className="text-body">You have <strong>5 days left</strong> on your subscription</div>
                        <Link to="" className="btn btn-warning ml-auto">Upgrade</a>
                    </div> */}

                <h4 className="card-header__title mb-3">Featured Courses</h4>

                <div className="row card-group-row">
                    <DashboardFeaturedCourse title={'English'} />
                    <DashboardFeaturedCourse title={'Basic Science'} />
                    <DashboardFeaturedCourse title={'Mathematics'} />
                    <DashboardFeaturedCourse title={'History'} />
                </div>


    <div className="row">
        <div className="col-lg-6">

                    <div className="card">
                        <div className="card-header card-header-large bg-light d-flex align-items-center">
                            <div className="flex">
                                <h4 className="card-header__title">In Progress</h4>
                                <div className="card-subtitle text-muted">Recent Courses</div>
                            </div>
                            <div className="ml-auto">
                                <Link to="student-courses.html" className="btn btn-light">Browse All</Link>
                            </div>
                        </div>




                        <ul className="list-group list-group-flush mb-0" style={{zIndex:"initial"}}>

                                            <DashboardListProgress />

                                            

                                            

                                </ul>
                    </div>

                    <div className="card">
                            <div className="card-header card-header-large bg-light d-flex align-items-center">
                            <div className="flex">
                                <h4 className="card-header__title">My Quizes</h4>
                                <div className="card-subtitle text-muted">Score</div>
                            </div>
                            <div className="dropdown ml-auto">
                                <a className="btn btn-sm btn-light" href="#">View all</a>
                            </div>
                        </div>



                        <ul className="list-group list-group-flush mb-0">

                                <DashboardMyQuiz />

                                

                                
                        </ul>
                    </div>
        </div>
        <div className="col-lg-6">

            <div className="card card__course">
                        <div className=" d-flex justify-content-center">
                            <Link className="" to="#">

                                {/* <img src="assets/images/logos/vuejs.svg" className="mb-1" style="width:80px;" alt="logo" className="rounded">  */}
                                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600" style={{width:'100%'}} alt="Social Media" />


                            </Link>

                        </div>
                <div className="p-3">
                    <div className="d-flex align-items-center">
                        <div>
                            <Link to className="text-body mb-1" href="#"><strong>What do you want to learn?</strong></Link><br />
                            <div className="d-flex align-items-center">
                                <span className="text-blue mr-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40" width="16" height="16" style={{position:'relative', top:'-2px'}}>
                                        <g transform="matrix(1.6666666666666667,0,0,1.6666666666666667,0,0)">
                                            <path d="M2.5,16C2.224,16,2,15.776,2,15.5v-11C2,4.224,2.224,4,2.5,4h14.625c0.276,0,0.5,0.224,0.5,0.5V8c0,0.552,0.448,1,1,1 s1-0.448,1-1V4c0-1.105-0.895-2-2-2H2C0.895,2,0,2.895,0,4v12c0,1.105,0.895,2,2,2h5.375c0.138,0,0.25,0.112,0.25,0.25v1.5 c0,0.138-0.112,0.25-0.25,0.25H5c-0.552,0-1,0.448-1,1s0.448,1,1,1h7.625c0.552,0,1-0.448,1-1s-0.448-1-1-1h-2.75 c-0.138,0-0.25-0.112-0.25-0.25v-1.524c0-0.119,0.084-0.221,0.2-0.245c0.541-0.11,0.891-0.638,0.781-1.179 c-0.095-0.466-0.505-0.801-0.981-0.801L2.5,16z M3.47,9.971c-0.303,0.282-0.32,0.757-0.037,1.06c0.282,0.303,0.757,0.32,1.06,0.037 c0.013-0.012,0.025-0.025,0.037-0.037l2-2c0.293-0.292,0.293-0.767,0.001-1.059c0,0-0.001-0.001-0.001-0.001l-2-2 c-0.282-0.303-0.757-0.32-1.06-0.037s-0.32,0.757-0.037,1.06C3.445,7.006,3.457,7.019,3.47,7.031l1.293,1.293 c0.097,0.098,0.097,0.256,0,0.354L3.47,9.971z M7,11.751h2.125c0.414,0,0.75-0.336,0.75-0.75s-0.336-0.75-0.75-0.75H7 c-0.414,0-0.75,0.336-0.75,0.75S6.586,11.751,7,11.751z M18.25,16.5c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-5.226 c0-0.174-0.091-0.335-0.239-0.426c-1.282-0.702-2.716-1.08-4.177-1.1c-0.662-0.029-1.223,0.484-1.252,1.146 c-0.001,0.018-0.001,0.036-0.001,0.054v7.279c0,0.646,0.511,1.176,1.156,1.2c1.647-0.011,3.246,0.552,4.523,1.593 c0.14,0.14,0.33,0.219,0.528,0.218c0.198,0.001,0.388-0.076,0.529-0.215c1.277-1.044,2.878-1.61,4.527-1.6 c0.641-0.023,1.15-0.547,1.156-1.188v-7.279c-0.001-0.327-0.134-0.64-0.369-0.867c-0.236-0.231-0.557-0.353-0.886-0.337 c-1.496,0.016-2.963,0.411-4.265,1.148c-0.143,0.092-0.23,0.251-0.23,0.421V16.5z" stroke="none" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </span>
                                <Link to="#" className="small">Easy Study PS</Link>
                            </div>
                        </div>
                        <Link to="#" className="btn btn-primary ml-auto">Resume <i className="material-icons">arrow_forward</i></Link>
                    </div>
                </div>
                <div className="progress" style={{height:'4px'}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width:61}} aria-valuenow="61" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div className="card">
                <div className="card-header card-header-large bg-white d-flex align-items-center">
                    <h4 className="card-header__title flex m-0">Recent Activity</h4>
                    <div className=" flatpickr-wrapper flatpickr-calendar-right d-flex ml-auto">
                        <div data-toggle="flatpickr" data-flatpickr-wrap="true" data-flatpickr-static="true" data-flatpickr-mode="range" data-flatpickr-alt-format="d/m/Y" data-flatpickr-date-format="d/m/Y">
                            <Link to="javascript:void(0)" className="link-date" data-toggle>13/03/2018 <span className="text-muted mx-1">to</span> 20/03/2018</Link>
                            <input className="d-none" type="hidden" value="13/03/2018 to 20/03/2018" data-input />
                        </div>
                    </div>
                </div>
                <div className="card-header card-header-tabs-basic nav" role="tablist">
                    <Link to="#activity_all" className="active" data-toggle="tab" role="tab" aria-controls="activity_all" aria-selected="true">All</Link>
                    <Link to="#activity_purchases" data-toggle="tab" role="tab" aria-controls="activity_purchases" aria-selected="false">Annoucements</Link>
                    <Link to="#activity_emails" data-toggle="tab" role="tab" aria-controls="activity_emails" aria-selected="false">Tasks</Link>
                    <Link to="#activity_quotes" data-toggle="tab" role="tab" aria-controls="activity_quotes" aria-selected="false">Submissions</Link>
                </div>
                <div className="list-group tab-content list-group-flush">
                    <div className="tab-pane active show fade" id="activity_all">



                        
                        
                        

                        <div className="card-footer text-center border-0">
                            <a className="text-muted" href=""></a>
                        </div>
                    </div>
                    <div className="tab-pane" id="activity_purchases">



                      

                    </div>
                    <div className="tab-pane" id="activity_emails">

                        

                        

                        

                    </div>
                    <div className="tab-pane" id="activity_quotes"></div>
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

export default connect(null, actions)(StudentDashboard);