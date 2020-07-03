import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import speaker from "../assets/speaker.png";

class ClassCard extends Component {
    goToCourseDetail = (e, className) => {
        this.props.selectedClass(className)
    }
  render() {
    return (
        <div key={this.props.id}  style={{cursor:'pointer'}} onClick={(e) => this.goToCourseDetail(e, this.props.className)} className="col-lg-3 col-md-4 card-group-row__col" key={this.props.id}>
        <div className="card card-group-row__card ">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                
                <div className="d-flex flex-column">
                    <div className="mb-3 d-flex flex-column  ">
                        <Link onClick={(e) => this.goToCourseDetail(e, this.props.id)} to="#" className="text-dark mb-2">
                            <strong>{this.props.className}</strong>
                        </Link>
                        {/* <span className="mt-1 badge badge-pill badge-soft-primary">
                            {this.props.target.toUpperCase()}
                        </span> */}
                    </div>
                    {/* <div className="">
                        <p>{this.props.message}</p>
                    </div> */}
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

export default ClassCard
