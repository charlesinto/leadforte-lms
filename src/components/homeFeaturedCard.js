import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import school from "../assets/school.png";

class HomeFeaturedCourse extends Component {
  render() {
    return (
        <div className="col-md-3">
        <div className="card card__course" data-aos="fade-up" data-offset="-100">
            <div className="card-header card-header-large card-header-dark bg-dark d-flex justify-content-center">
                <Link className="card-header__title  justify-content-center align-self-center d-flex flex-column" href="#">
                    <span><img src={school} className="mb-3" style={{width: 34}} alt="logo" /></span>
                    <span className="course__title">{this.props.courseName}</span>
                    <span className="course__subtitle">Start Learning</span>
                </Link>
            </div>
            <div className="p-3">
                <div className="mb-2">
                    <span className="mr-2">
                        {/* <Link to="#" className="rating-link active"><i className="material-icons icon-16pt">star</i></Link>
                        <Link to="#" className="rating-link active"><i className="material-icons icon-16pt">star</i></Link>
                        <Link to="#" className="rating-link active"><i className="material-icons icon-16pt">star</i></Link>
                        <Link to="#" className="rating-link active"><i className="material-icons icon-16pt">star</i></Link>
                        <Link to="#" className="rating-link active"><i className="material-icons icon-16pt">star_half</i></Link> */}
                    </span>
                    {/* <strong>4.7</strong><br /> */}
                    {/* <small className="text-muted">(391 ratings)</small> */}
                </div>
                <div className="d-flex align-items-center">
                    <strong className="h4 m-0">Learn</strong>
                    <Link to="#" className="btn btn-primary ml-auto"><i className="far fa-check-circle"></i></Link>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default HomeFeaturedCourse;
