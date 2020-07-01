import React, { Component } from "react";
import { Link } from "react-router-dom";


class DashboardListProgress extends Component{
    render(){
        return (
            <li className="list-group-item" style={{zIndex:"initial"}}>
                                                <div className="d-flex align-items-center">
                                                    <Link to="#" className="mr-3">
                                                        <img src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=clamp&amp;w=35&amp;h=35" alt="course" className="" />

                                                    </Link>
                                                    <div className="flex">
                                                        <Link to="#" className="text-body"><strong>Basics of Social Media</strong></Link>
                                                        <div className="d-flex align-items-center">
                                                            <div className="progress" style={{height: 4}}>
                                                                <div className="progress-bar bg-primary" role="progressbar" style={{width:'60%'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                            </div>
                                                            <small className="text-muted ml-2">60%</small>
                                                        </div>
                                                    </div>
                                                    <div className="dropdown ml-3">
                                                        <Link to="#" className="dropdown-toggle text-muted" data-caret="false" data-toggle="dropdown">
                                                            <i className="material-icons">more_vert</i>
                                                        </Link>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <Link to="#">View Stats</Link>
                                                            <Link to="#">Proceed</Link>
                                                            <Link to="#">Close</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
        )
    }
}

export default DashboardListProgress