import React, {Component} from 'react'
import Dashboard from '../hoc/dashboard'
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { auth, db } from "../database";
import Swal from 'sweetalert2';

class Profile extends Component{
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        admissionNumber: ''
    }
    componentDidMount(){
        this.props.setActiveLink('profile')
        const user = JSON.parse(localStorage.getItem('easystudy-user'))
        this.setState({
            firstName: user.fullName.split(' ')[0],
            lastName: user.fullName.split(' ')[1],
            email: user.email,
            admissionNumber: user.admissionNumber,
            phoneNumber: user.phoneNumber
        })
    }
    handleOnChange = e => {
        const {target: {name, value}} = e;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async (e) => {
        try{
            e.preventDefault()
            const {firstName, lastName} = this.state;
            if(firstName.trim() === '' || lastName.trim() === ''){
                return Swal.fire('first and last name is required')
            }
            const user = JSON.parse(localStorage.getItem('easystudy-user'))
            const uid = auth().currentUser.uid;
            this.props.initiateLoading(true)
            const docs = await db.collection('users').where('uid', '==', uid).get()
            if(!docs.empty){
                await db.doc(`/users/${docs.docs[0].id}`).update({
                    firstName,
                    lastName
                })
                localStorage.setItem('easystudy-user', JSON.stringify({
                    ...user,
                    firstName,
                    lastName
                }))
                this.props.initiateLoading(false)
                Swal.fire('Update Successful')
                
            }
        }catch(error){
            console.error(error);
            this.props.initiateLoading(false)
            Swal.fire('Some errors were encountered')
        }
    }
    render(){
        return (
        <Dashboard>
            <div class="mdk-drawer-layout__content page">
                <div class="container-fluid page__heading-container">
                    <div class="page__heading d-flex align-items-center justify-content-between">

                        <h1 class="m-0">Edit Account</h1>
                    </div>
                </div>

                <hr className="my-5"  />

                <div className="container-fluid page__container">
                <div class="card card-form">
                            <div class="row no-gutters">
                                <div class="col-lg-4 card-body">
                                    <p><strong class="headings-color">Basic Information</strong></p>
                                    <div className="card-form__body card-body rouded-avatar">
                                            {
                                                this.state.firstName[0] && this.state.lastName[0] ?
                                            (<><span className="initials">{this.state.firstName[0].toUpperCase()}</span><span className="initials">{this.state.lastName[0].toUpperCase()}</span></>) : <span class="mr-3">
                                                <img src={process.env.PUBLIC_URL + "/assets/images/frontted-logo-blue.svg"} width="43" height="43" alt="avatar" />
                                            </span>
                                            }
                                    </div>
                                    
                                </div>
                                <div class="col-lg-8 card-form__body card-body">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="fname">First name</label>
                                                <input id="fname" name="firstName" type="text" class="form-control" onChange={this.handleOnChange} placeholder="First name" value={this.state.firstName} />
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="lname">Last name</label>
                                                <input id="lastName" name="lastName"  type="text" class="form-control" onChange={this.handleOnChange}  placeholder="Last name" value={this.state.lastName} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="fname">Phone Number</label>
                                                <input disabled id="phoneNumber" type="text"  name="phoneNumber" class="form-control" onChange={this.handleOnChange}  placeholder="Phone Number" value={this.state.phoneNumber} />
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="lname">Email Address</label>
                                                <input disabled id="email" name="email" type="text" class="form-control" value={this.state.email} placeholder="Email Address" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="desc">Admission Number</label>
                                        <input disabled id="admissionNumber" name="admissionNumber" type="text" value={this.state.admissionNumber} class="form-control" placeholder="Admission Number" />
                                    </div>
                                    <div class="row justify-content-end my-4">
                                        <div className="form-group">
                                            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Update</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

            </div>
         </Dashboard>)
    }
}


export default connect(null, actions)(Profile);