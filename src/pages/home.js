import React, { Component } from 'react';
import Dashboard from '../hoc/dashboard';
import { Link } from 'react-router-dom';
import HomeFeaturedCourse from '../components/homeFeaturedCard';

class Home extends Component {
    state = {course: [{courseName:'Math'}, {courseName:'English'}, {courseName:'History'},
    {courseName:'Civic Education'}]}
  componentDidMount(){
      window.AOS.init()
  }
  renderHomeFeaturedCourse = () => {
      return this.state.course.map(course => {
          return <HomeFeaturedCourse courseName={course.courseName} />
      })
  }
  render() {
    return (
      <Dashboard> 
        <div className="mdk-drawer-layout__content page">
<div className="home-banner text-white mb-4">
    <div className="container-fluid page__container">
        <h1 className="display-4 bold" data-aos="fade-up" data-aos-duration="800">Readers are the Leaders of Tomorrow</h1>
        <p className="lead mb-5" data-aos="fade-up" data-aos-duration="1000">Your future awaits you</p>
        <div data-aos="fade-down" data-aos-duration="400" data-aos-delay="400" data-offset="-100">
            <Link to="#" className="btn btn-light btn-lg mr-1" href="student-courses.html">Browse Lessons</Link>
            {/* <a className="btn btn-success btn-lg" href="student-courses.html">Subscribe</a> */}
        </div>
    </div>
</div>





<div className="container-fluid page__container">
    <h2 className="bold m-4 text-center p-4">Recent Courses</h2>
        <div className="row">
            {this.renderHomeFeaturedCourse()}
        </div>

    {/* <div class="m-4 p-4">
        <h2 class="bold mb-1 text-center">Features &amp; Highlights</h2>
        <p class="lead text-muted text-center">What makes LEMA an awesome template</p>
    </div>
    */}
    </div>
    </div>
    

          </Dashboard>
    );
  }
}

export default Home;
