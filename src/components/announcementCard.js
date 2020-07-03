import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import speaker from "../assets/speaker.png";

class Annoucement extends Component {
    goToCourseDetail = (e, id) => {

    }
  render() {
    return (
        <div key={this.props.id}  style={{cursor:'pointer'}} onClick={(e) => this.goToCourseDetail(e, this.props.id)} className="col-lg-3 col-md-4 card-group-row__col" key={this.props.id}>
        <div className="card card-group-row__card ">
            <div className="card-body d-flex">
                <div className="avatar mx-2">
                    <span className="bg-soft-purple avatar-title rounded-circle text-center text-purple">
                        <img src={speaker} className="mb-3" style={{width: 34}} alt='book' />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40" width="22" height="22">
                            <g transform="matrix(1.6666666666666667,0,0,1.6666666666666667,0,0)">
                                <path d="M11.75,4.5C11.888,4.5,12,4.612,12,4.75V5c0,0.552,0.448,1,1,1s1-0.448,1-1V4.75c0-0.138,0.112-0.25,0.25-0.25h1 c0.138,0,0.25,0.112,0.25,0.25v4.7c0,0.135,0.11,0.245,0.246,0.244c0.018,0,0.036-0.002,0.054-0.006 c0.48-0.108,0.969-0.171,1.46-0.188c0.133-0.002,0.239-0.11,0.24-0.243V4.5c0-1.105-0.895-2-2-2h-1.25C14.112,2.5,14,2.388,14,2.25 V1c0-0.552-0.448-1-1-1s-1,0.448-1,1v1.25c0,0.138-0.112,0.25-0.25,0.25h-1.5C10.112,2.5,10,2.388,10,2.25V1c0-0.552-0.448-1-1-1 S8,0.448,8,1v1.25C8,2.388,7.888,2.5,7.75,2.5h-1.5C6.112,2.5,6,2.388,6,2.25V1c0-0.552-0.448-1-1-1S4,0.448,4,1v1.25 C4,2.388,3.888,2.5,3.75,2.5H2c-1.105,0-2,0.895-2,2v13c0,1.105,0.895,2,2,2h7.453c0.135,0,0.244-0.109,0.245-0.243 c0-0.019-0.002-0.038-0.007-0.057c-0.109-0.48-0.173-0.968-0.191-1.46c-0.002-0.133-0.11-0.239-0.243-0.24H2.25 C2.112,17.5,2,17.388,2,17.25V4.75C2,4.612,2.112,4.5,2.25,4.5h1.5C3.888,4.5,4,4.612,4,4.75V5c0,0.552,0.448,1,1,1s1-0.448,1-1 V4.75C6,4.612,6.112,4.5,6.25,4.5h1.5C7.888,4.5,8,4.612,8,4.75V5c0,0.552,0.448,1,1,1s1-0.448,1-1V4.75 c0-0.138,0.112-0.25,0.25-0.25H11.75z M17.5,11c-3.59,0-6.5,2.91-6.5,6.5s2.91,6.5,6.5,6.5s6.5-2.91,6.5-6.5 C23.996,13.912,21.088,11.004,17.5,11z M17.5,22.5c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S18.052,22.5,17.5,22.5z M18.439,18.327c-0.118,0.037-0.196,0.15-0.189,0.273v0.15c0,0.414-0.336,0.75-0.75,0.75s-0.75-0.336-0.75-0.75V18.2 c0.003-0.588,0.413-1.096,0.988-1.222c0.607-0.131,0.993-0.73,0.862-1.338c-0.131-0.607-0.73-0.993-1.338-0.862 c-0.517,0.112-0.887,0.57-0.887,1.099c0,0.414-0.336,0.75-0.75,0.75s-0.75-0.336-0.75-0.75c0-1.45,1.176-2.625,2.626-2.624 c1.45,0,2.625,1.176,2.624,2.626c0,1.087-0.671,2.062-1.686,2.451V18.327z" stroke="none" fill="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </svg> */}
                    </span>
                </div>
                <div className="d-flex flex-column">
                    <div className="mb-3 d-flex flex-column">
                        <Link onClick={(e) => this.goToCourseDetail(e, this.props.id)} to="#" className="text-dark mb-2">
                            <strong>{this.props.title}</strong>
                        </Link>
                        <span className="mt-1 badge badge-pill badge-soft-primary">
                            {this.props.target.toUpperCase()}
                        </span>
                    </div>
                    <div className="">
                        <p>{this.props.message}</p>
                    </div>
                </div>
                {/* <p className="text-muted">Become a SCRUM master in scheduling tasks.</p> */}

                {/* <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <span className="badge badge-pill badge-soft-secondary">
                            2 days left
                        </span>
                    </div>
                    <div className="h4 text-primary">$49</div>
                </div> */}
            </div>
        </div>
    </div>
    );
  }
}

export default Annoucement
