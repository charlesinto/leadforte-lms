import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Register from "./pages/register";
import AuthRoute from "./components/AuthRoute";
import LoginStudent from "./pages/loginStudent";
// import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./pages/studentDashboard";
import Courses from "./pages/courses";
import StudentCourses from "./pages/courses";
import Classroom from './pages/classsroom'
import AuditCourse from "./pages/auditCourse";
import Announcements from "./pages/announcements";
import TeacherLogin from './pages/teacherLogin';
import ClassLevel from "./pages/classLevel";
import Profile from "./pages/profile";
import Assessments from "./pages/assessments";
import AssessmentDetail from './pages/assessmentDetail'
import Quiz from "./pages/quiz";
// import AdminRoute from "./components/AdminRoute";
// import DashBoard from './hoc/Dashboard';
// import Layout from './hoc/layout';

class Root extends Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute 
            exact
            path="/"
            component={Home}
            authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute 
            exact
            path="/student/dashboard"
            component={StudentDashboard}
            authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute
          exact
           path="/student/courses"
           component={ClassLevel}
           authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute
            component={Courses}
            exact
            path="/student/view-courses"
            authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute
            component={Profile}
            exact
            path="/student/profile"
            authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute
          exact
           path="/student/audit-course/:id"
           component={AuditCourse}
           authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute 
            exact
            path="/app/classroom"
            component={Classroom}
            authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute
          exact
          path="/students/assessments/detail"
          component={AssessmentDetail}
          authenticated={this.props.isAuthenticated}

        />
        <ProtectedRoute
          exact
          path="/student/take-quiz"
          component={Quiz}
          authenticated={this.props.isAuthenticated}

        />
        <ProtectedRoute
          exact
          path="/students/assessments"
          component={Assessments}
          authenticated={this.props.isAuthenticated}

        />
        
        <ProtectedRoute
            exact
            path="/teacher/login"
            component={TeacherLogin}
            authenticated={this.props.isAuthenticated}
        />
        <ProtectedRoute 
            exact
            path="/app/annoucements"
            component={Announcements}
            authenticated={this.props.isAuthenticated}
        />
        <AuthRoute
          exact
          path="/register"
          component={Register}
          authenticated={this.props.isAuthenticated}
        />
        <AuthRoute
          exact
          path="/student/login"
          component={LoginStudent}
          authenticated={this.props.isAuthenticated}
        />
        {/* <AuthRoute
          exact
          path="/signup"
          component={Signup}
          authenticated={this.props.isAuthenticated}
        /> */}
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, null)(Root);
