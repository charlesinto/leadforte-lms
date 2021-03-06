import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import swal from "sweetalert2";
import { db, auth } from "../database";
import axios from "axios";

class Login extends Component {
    state = {
        schoolPin: '', fullName: '', phoneNumber: '', email: '', admissionNumber: ''
    }
    handleOnChange = (e) => {
        const {target: {name, value}} = e;
        this.setState({
            [name]: value
        })
    }
    registerStudent = async (e) => {
        try{
            e.preventDefault()
            const {schoolPin, fullName, phoneNumber, email, admissionNumber} = this.state;
            if(schoolPin.trim() === '' || fullName.trim() === '' || phoneNumber.trim() === '' || email.trim() === '' || admissionNumber.trim() === ''){
                return swal.fire('Please note that all fields are required')
            }
            //verify school pin
            this.props.initiateLoading(true)
            const docs = await db.doc(`/partners/${schoolPin}`).get();
           
            if(!docs.exists){
                 this.props.initiateLoading(false)
                return swal.fire('Invalid School Activation Pin, please contact admin')
            }
            const appDomain = docs.data()['appDomain'];
            localStorage.setItem('appDomain', appDomain);
            localStorage.setItem('schoolCode', schoolPin);
            axios.defaults.baseURL = appDomain;
             // this.props.initiateLoading(true)
     
             //verify student class
     
             const students = await db.collection('students').where('schoolCode', '==', schoolPin).where('admissionNumber', '==', admissionNumber).get()
             if(students.empty){
                 this.props.initiateLoading(false)
                 return swal.fire('No Student Accout found with the admission number, please contact admin');
             }
     
             //create account for student
            const user = await auth().createUserWithEmailAndPassword(email, phoneNumber)
            
            await db.collection(`users/${schoolPin}/activated users`).add({
                admissionNumber,
                firstName: fullName.split(' ')[0],
                lastName: fullName.split(' ')[1],
                schoolCode: schoolPin,
                phoneNumber,
                email,
                type: 'student',
                uid: user.user.uid

            })

            localStorage.setItem('easystudy-user', JSON.stringify({
                schoolCode: schoolPin,
                email,
                fullName,
                phoneNumber,
                type: 'student',
                uid: user.user.uid,
                admissionNumber
            }))

            this.props.initiateLoading(false)
            this.props.history.push('/')
        }catch(error){
            console.log(error)
            this.props.initiateLoading(false)
            if(error.code === 'auth/invalid-email'){
                return swal.fire('Invalid Email Address')
            }
            if(error.code === 'auth/weak-password'){
                return swal.fire('Phone Number is less than 11 characters')
            }
            return swal.fire('Some errors were encountered, please try again')
        }
    }
  render() {
    return (
      <div className="container layout-login-centered-boxed"> 
          <div className="layout-login-centered-boxed__form">
            <div className="d-flex flex-column justify-content-center align-items-center mt-2 mb-4 navbar-light">
                <Link to="#" className="text-center text-light-gray mb-4">

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"  viewBox="0 0 40 40" width="60" height="60">
                        <g transform="matrix(1.6666666666666667,0,0,1.6666666666666667,0,0)">
                            <path d="M12.177,7.4c-0.23,0-0.416,0.186-0.417,0.416v1.17c-0.011,0.23,0.166,0.426,0.396,0.437s0.426-0.166,0.437-0.396 c0.001-0.014,0.001-0.027,0-0.041V7.819c0.001-0.23-0.185-0.418-0.415-0.419C12.178,7.4,12.177,7.4,12.177,7.4z M7.51,18.486 c-0.23,0-0.416,0.186-0.416,0.416l0,0v0.585c-0.011,0.23,0.166,0.426,0.396,0.437s0.426-0.166,0.437-0.396 c0.001-0.014,0.001-0.027,0-0.041V18.9C7.925,18.671,7.739,18.487,7.51,18.486z M20.15,4.04c-0.232-0.047-0.4-0.252-0.4-0.489V2 c0-1.105-0.895-2-2-2H5.25c-1.637,0-2.972,1.311-3,2.948c0,0.017,0,18.052,0,18.052c0,1.657,1.343,3,3,3h14.5c1.105,0,2-0.895,2-2 V6C21.75,5.049,21.081,4.23,20.15,4.04z M4.25,3c0-0.552,0.448-1,1-1h12c0.276,0,0.5,0.224,0.5,0.5v1c0,0.276-0.224,0.5-0.5,0.5 h-12C4.698,4,4.25,3.552,4.25,3z M9.427,16.569c0,0.423-0.141,0.833-0.4,1.167c0.259,0.334,0.4,0.744,0.4,1.167v0.583 c-0.003,1.057-0.86,1.912-1.917,1.914H6.344c-0.414,0-0.75-0.336-0.75-0.75v-5.831c0-0.414,0.336-0.75,0.75-0.75H7.51 c1.058,0.002,1.915,0.859,1.917,1.917V16.569z M14.093,12.486c0,0.414-0.336,0.75-0.75,0.75s-0.75-0.336-0.75-0.75v-1.167 c-0.011-0.23-0.207-0.407-0.437-0.396c-0.214,0.011-0.386,0.182-0.396,0.396v1.167c0,0.414-0.336,0.75-0.75,0.75 s-0.75-0.336-0.75-0.75V7.819c0.024-1.058,0.902-1.897,1.96-1.873c1.024,0.023,1.849,0.848,1.873,1.873V12.486z M18.01,19.9 c0.414,0,0.75,0.336,0.75,0.75s-0.336,0.75-0.75,0.75c-1.702-0.002-3.081-1.382-3.083-3.084v-1.163 c0.002-1.702,1.381-3.082,3.083-3.084c0.414,0,0.75,0.336,0.75,0.75s-0.336,0.75-0.75,0.75c-0.874,0.001-1.582,0.71-1.583,1.584 v1.166C16.429,19.192,17.137,19.899,18.01,19.9z M7.51,15.569c-0.23,0-0.416,0.186-0.416,0.416l0,0v0.585 C7.083,16.8,7.26,16.996,7.49,17.007s0.426-0.166,0.437-0.396c0.001-0.014,0.001-0.027,0-0.041v-0.583 C7.927,15.757,7.74,15.57,7.51,15.569z" stroke="none" fill="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </svg>

                </Link>
            </div>

            <div className="card card-body">


                {/* <div className="alert alert-soft-success d-flex" role="alert">
                    <i className="material-icons mr-3">check_circle</i>
                    <div className="text-body">An email with password reset instructions has been sent to your email address, if it exists on our system.</div>
                </div> */}

                <Link to="#" className="btn btn-light btn-block">
                    <span className="mr-2">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" className="abcRioButtonSvg">
                            <g>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                        </svg>
                    </span>
                    Continue with Google
                </Link>

                <div className="page-separator">
                    <div className="page-separator__text">or</div>
                </div>

                <form   >
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                <label className="text-label" htmlFor="schoolPin">School Activation Pin</label>
                                <div className="input-group input-group-merge">
                                    <input onChange={this.handleOnChange} value={this.state.schoolPin} id="schoolPin" name="schoolPin" type="text" required className="form-control form-control-prepended" placeholder="101010" />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fa fa-key"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                            <label className="text-label" htmlFor="fullName">Full Name</label>
                            <div className="input-group input-group-merge">
                                <input onChange={this.handleOnChange} value={this.state.fullName} id="fullName" name="fullName" type="text" required className="form-control form-control-prepended" placeholder="John Obi" />
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="far fa-user-circle"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-label" htmlFor="admissionNumber">Admission Number</label>
                                <div className="input-group input-group-merge">
                                    <input onChange={this.handleOnChange} value={this.state.admissionNumber} id="admissionNumber" name="admissionNumber" type="text" required className="form-control form-control-prepended" placeholder="20200002" />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fas fa-graduation-cap"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                                <label className="text-label" htmlFor="phoneNumber">Phone Number:</label>
                                <div className="input-group input-group-merge">
                                    <input onChange={this.handleOnChange} value={this.state.phoneNumber} id="phoneNumber" name="phoneNumber" type="text" required className="form-control form-control-prepended" placeholder="08041941940" />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fas fa-phone-square-alt"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    
                    <div className="form-group">
                        <label className="text-label" htmlFor="email">Email Address:</label>
                        <div className="input-group input-group-merge">
                            <input onChange={this.handleOnChange} value={this.state.email} id="email" type="email" name="email" required className="form-control form-control-prepended" placeholder="john@doe.com" />
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <span className="far fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <label className="text-label" htmlFor="password">Password:</label>
                        <div className="input-group input-group-merge">
                            <input id="password" type="password" required="" className="form-control form-control-prepended" placeholder="Enter your password" />
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <span className="fa fa-key"></span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="form-group mb-1">
                        <button onClick={this.registerStudent} className="btn btn-block btn-primary" type="submit">Register</button>
                    </div>
                    {/* <div className="form-group text-center">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" checked="" id="remember" />
                            <label className="custom-control-label" for="remember">Remember me for 30 days</label>
                        </div>
                    </div> */}
                    <div className="form-group text-center mt-4">
                            Are you a returning student? 
                            <Link className="text-underline" to="/student/login"> Login</Link>
                    </div>
                    <div className="form-group text-center mt-2">
                        {/* <Link to="#">Forgot password?</Link> <br/> */}
                        Are you a Teacher? <Link className="text-underline" to="#">Login</Link>
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Login);
