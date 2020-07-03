
import React, {Component} from 'react'
import { connect } from "react-redux";
import Dashboard from "../hoc/dashboard";
import * as actions from '../redux/actions'
import { db,auth } from "../database";
import AssessmentCard from "../components/assessmentCard";
// import { Link } from 'react-router-dom';

class TeacherAssessment extends Component{
    state  = {
        assesments: [],
        sortBy: '1',
        response: []
    }
    componentDidMount(){
        this.props.setActiveLink('assessments')
        this.getAnnouncements()
    }
    
    getAnnouncements = () => {
        
        const uid = auth().currentUser.uid;
        db.collection('teachers').where('uid', '==', uid).onSnapshot(this.onDocmentSnapshot)
        
    }
    onDocmentSnapshot = (doc) => {
        const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode']
        
        doc.docs[0].data().classes.forEach(item => {
            
            db.collection('assessments').where('schoolCode', '==', schoolCode).where('studentClass', '==', item.class).onSnapshot(quiz => {
                const assesments = []
                
                quiz.forEach((doc) => {
                    const studentResponse = [];
                    db.collection(`studentResponse/${schoolCode}/test`)
                    
                        .where('assessmentId', '==', doc.id).get().then((response) => {
                            
                            response.docs.forEach(ba => {
                                if(ba.exists){
                                    
                                    studentResponse.push({
                                        id: ba.id,
                                        ...ba.data()
                                    })
                                }
                            })
                        })
                        
                        assesments.push({
                            assessment: {
                               
                                ...doc.data(),
                                id: doc.id,
                                studentAnswer: studentResponse
                            }
                        })
                })
                this.setState({
                    assesments
                }, () => {console.log(this.state)})
                
                
            })
        })
        
    }
    sortDescending = (a,b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.createdAt - a.createdAt
      }
      sortAscending = (a,b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return a.createdAt - b.createdAt
      }
      handleOnChange = e => {
        const {target: {name, value}} = e;
        this.setState({
            [name]: value
        }, () => {
            if(this.state.sortBy === '1'){
                this.setState({
                    assessments: [...this.state.assesments.sort(this.sortDescending)]
                })
            }else{
              this.setState({
                assesments: [...this.state.assesments.sort(this.sortAscending)]
              })
            }
        })
    }
    goToAssessment = (id) => {
        const assessment = this.state.assesments.find(item => item.assessment.id === id)
        this.setState({
            response: assessment.assessment.studentAnswer
        }, )
        window.$('#responseModal').modal('show')
    }
    render(){
        // console.log(this.state.)
        return (
            <Dashboard>
                <div className="mdk-drawer-layout__content page">
                    <div className="container-fluid page__heading-container">
                          <div className="page__heading d-flex align-items-center justify-content-between">
                              <h1 className="m-0">Assessments</h1>
                              {/* <Link to="/student/courses" className="btn btn-success ml-3">Assessments <i className="material-icons">arrow_forward</i></Link> */}
                          </div>
                          <form action="#" className="mb-2 mt-3">
                            <div className="d-lg-flex">
                                <div className="search-form mb-3 mr-3-lg search-form--light">
                                    <input type="text" className="form-control" disabled placeholder="Search Assesments" id="searchSample02" />
                                    <button className="btn" type="button"><i className="material-icons">search</i></button>
                                </div>

                                <div className="form-inline  mb-3 ml-auto">
                                    <div className="form-group mr-3">
                                        <label for="custom-select" className="form-label mr-1">Sort By: </label>
                                        <select value={this.state.sortBy} name="sortBy" onChange={this.handleOnChange} id="custom-select" className="form-control custom-select" style={{width:200}} >
                                            {/* <option selected>All categories</option> */}
                                            <option value="1">Latest</option>
                                            <option value="2">Oldest</option>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                        </form>
                      </div>
                     <hr />
                     

                        

                    <div className="container-fluid page__containe">
                      
                        <div class="container page__container mt-4 mb-4 px-2">
                            <div className="row">
                                    {
                                        this.state.assesments.map(doc => {
                                            return <AssessmentCard key={doc.assessment.id}
                                            validUntil={doc.assessment.validUntil}
                                             id={doc.assessment.id} quizName={doc.assessment.quizName}
                                             goToAssessment={this.goToAssessment}
                                             subject={doc.assessment.subject}/>
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" data-backdrop="static" data-keyboard="false" id="responseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Assessment Report</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <table class="table table-striped px-2 mt-5 mb-5">
                                <thead>
                                    <tr>
                                        <th>Student Full Name</th>
                                        <th>Marks Obtained</th>
                                        <th>Date Submitted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.response.map((item, i) => (
                                            <>
                                                <tr key={i}>
                                                    <td>{item.studentFullName}</td>
                                                    <td>{item.totalMarksObtained}</td>
                                                    <td>{new Date(item.completedAt.seconds * 1000).toLocaleString()}</td>
                                                </tr>
                                            </>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>  
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </Dashboard>
        )
    }
}


const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(TeacherAssessment)