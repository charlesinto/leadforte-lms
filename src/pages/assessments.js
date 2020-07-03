import React, {Component} from 'react'
import { connect } from "react-redux";
import Dashboard from "../hoc/dashboard";
import * as actions from '../redux/actions'
import { db } from "../database";
import AssessmentCard from "../components/assessmentCard";
// import { Link } from 'react-router-dom';

class Assessments extends Component{
    state  = {
        assessments: [],
        sortBy: '1'
    }
    componentDidMount(){
        this.props.setActiveLink('assessments')
        this.getAssessments()
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
                    docId: assessmentDoc.id,
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
    goToAssessment = (id) => {
        const assessment = this.state.assessments.find(item => item.docId === id)
        this.props.assessmentSelected({assessment, data: this.state.assessments})
        this.props.history.push(`/students/assessments/detail`)
    }
    render(){
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
                                        this.state.assessments.map(doc => {
                                            return <AssessmentCard key={doc.id}
                                            validUntil={doc.validUntil}
                                             id={doc.docId} quizName={doc.quizName}
                                             goToAssessment={this.goToAssessment}
                                             subject={doc.subject}/>
                                        })
                                    }
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

export default connect(mapStateToProps, actions)(Assessments)