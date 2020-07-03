import React, {Component} from 'react'
import { connect } from "react-redux";
import Dashboard from "../hoc/dashboard";
import * as actions from '../redux/actions'
import { db, auth } from "../database";
// import AssessmentCard from "../components/assessmentCard";
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class AssessmentDetail extends Component{
    state  = {
        assessments: [],
        sortBy: '1',
        report: null
    }
    componentDidMount(){
        // this.props.setActiveLink('assessments')
        this.renderReport()
    }
    
    getAssessments = () => {
        const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode'];
        const admissionNumber = JSON.parse(localStorage.getItem('easystudy-user'))['admissionNumber'];
        db.collection('students').where('admissionNumber', '==', admissionNumber).where('schoolCode', '==', schoolCode)
            .onSnapshot(docs => {
                if(!docs.empty){
                    const userClass = docs.docs[0].data()['class']
                    console.log(userClass)
                    db.collection('assessments').where('schoolCode', '==', schoolCode)
                    .where('studentClass', '==', userClass).onSnapshot(this.onDocmentSnapshot)
                }
            })
    }
    onDocmentSnapshot = (doc) => {
        if(!doc.empty){
            const data = [];
            doc.docs.forEach(assessmentDoc => {
                data.push({
                    id: assessmentDoc.id,
                    ...assessmentDoc.data()
                })
            })
            data.sort(this.sortDescending)
            this.setState({
                assessments: [...data]
            }, () => console.log(this.state.assessments))
        }
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
                    assessments: [...this.state.assessments.sort(this.sortDescending)]
                })
            }else{
              this.setState({
                  assessments: [...this.state.assessments.sort(this.sortAscending)]
              })
            }
        })
    }

    startQuiz = () => {
        this.props.history.push('/student/take-quiz')

    }

    renderReport = () => {
        const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode'];
        const uid = auth().currentUser.uid;
        db.collection(`/studentResponse/${schoolCode}/test`).where('studentUserId', '==', uid)
        .where('assessmentId', '==', this.props.assessment.docId).onSnapshot(doc => {
            if(!doc.empty){
                const report = {
                    id: doc.docs[0].id,
                    ...doc.docs[0].data()
                }
                return this.setState({
                    report
                })
            }
            this.setState({
                report: null
            })
        })
    }
    /*
            
    */
    
    render(){
        return (
            <Dashboard>
                <div className="mdk-drawer-layout__content page">
                    <div className="container-fluid page__heading-container">
                          <div className="page__heading d-flex align-items-center justify-content-between">
                                <h1 className="m-0">{this.props.assessment.quizName}</h1>
                              <Link className="btn btn-success ml-3" onClick={() => this.props.history.goBack()} >Go Back <i className="material-icons">arrow_forward</i></Link>
                          </div>

                      </div>
                     <hr />
                     

                        

                    <div className="container-fluid page__containe">
                      
                        <div class="container page__container mt-4 mb-4 px-2">
                            <div className="row px-5">
                            <table class="table table-striped px-2 mt-2 mb-2">
                                
                                <tbody>
                                    <tr>
                                    {/* <th scope="row">1</th> */}
                                    <td>Subject</td>
                                    <td>{this.props.assessment.subject.toUpperCase()}</td>
                                    </tr>
                                    <tr>
                                    {/* <th scope="row">2</th> */}
                                    <td>Number of Questions</td>
                                    <td>{this.props.assessment.numberOfQuestions}</td>
                                    </tr>
                                    <tr>
                                    {/* <th scope="row">2</th> */}
                                    <td>Is Timed?</td>
                                    <td>{this.props.assessment.isTimed ? 'True' : 'false' }</td>
                                    </tr>
                                    <tr>
                                    {/* <th scope="row">2</th> */}
                                    <td>Expected Time To Complete</td>
                                    <td>{this.props.assessment.numberOfMinutesToComplete} mins</td>
                                    </tr>
                                    <tr>
                                    {/* <th scope="row">2</th> */}
                                    <td>Valid Until</td>
                                    <td>{this.props.assessment.validUntil}</td>
                                    </tr>
                                    <tr>
                                    <td>Total Valid Mark</td>
                                    <td>{this.props.assessment.totalValidMarks}</td>
                                    </tr>
                                    <tr>
                                    <td>Submission Status</td>
                                    <td>{this.state.report ? 'Submitted': 'Pending'}</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            {
                               this.state.report == null ? (
                                <div className="row mt-5 justify-content-end px-4">
                                    <button className="btn btn-primary" onClick={this.startQuiz}>Start Test</button>
                                </div>
                               ):
                               (
                                   <div className="mt-4">
                                       <div className="page__heading">
                                            <h1 className="m-0">Your Result</h1>
                                        </div>
                                        <div className="row px-5">
                                            <table class="table table-striped px-2 mt-2 mb-2">
                                
                                                <tbody>
                                                    
                                                    <tr>
                                                    {/* <th scope="row">2</th> */}
                                                    <td>Number of Correct Answers</td>
                                                    <td>{this.state.report.numberOfCorrectAnswers}</td>
                                                    </tr>
                                                    <tr>
                                                    <td>Total Marks Obtained</td>
                                                    <td>{this.state.report.totalMarksObtained}</td>
                                                    </tr>
                                                    <tr>
                                                    <td>Date Completed</td>
                                                    <td>{new Date(this.state.report.completedAt.seconds * 1000).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                        </div>
                                    </div>
                               )
                            }
                        </div>
                    </div>
                </div>
            </Dashboard>
        )
    }
}


const mapStateToProps = state => {
    const {UI: {assessment}} = state;
    return {assessment}
}

export default connect(mapStateToProps, actions)(AssessmentDetail)