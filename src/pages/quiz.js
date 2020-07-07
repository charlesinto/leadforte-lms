import React, {Component} from 'react'
import { connect } from "react-redux";
import Dashboard from "../hoc/dashboard";
import * as actions from '../redux/actions'
import { db, auth } from "../database";
// import AssessmentCard from "../components/assessmentCard";
import { Link } from 'react-router-dom';
import Choice from '../components/choices';
// import { Link } from 'react-router-dom';
import swal from 'sweetalert2'

class Quiz extends Component{
    state  = {
        assessments: [],
        sortBy: '1',
        currentIndex: 0,
        response: []
    }
    componentDidMount(){
        // this.props.setActiveLink('assessments')
    }
    goToNext = () => {
        if(this.state.currentIndex + 1 === this.props.assessment.questions.length ){
            return swal.fire(
                {
                    title: '<strong>Submit Assessment</strong>',
                    icon: 'info',
                    html:
                      '<p>You have reached the end of assessment, proceed to submit?</p>',
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                      '<i class="fa fa-thumbs-up"></i> Yes!',
                    confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText:
                      'Cancel',
                    cancelButtonAriaLabel: 'No',
                    showClass: {
                        popup: 'animate__animated animate__bounceInUp'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      }
                  }
            )
            .then(async (vale) => {
                if(vale.isConfirmed){
                    this.props.initiateLoading(true)
                    //totalMarksObtained
                    //totalValidMarks
                    let totalMarksObtained = 0;
                    const data = []
                    let numberOfCorrectAnswers = 0;
                    const assessmentId = this.props.assessment.docId;
                    const completedAt = new Date()
                    const studentUserId = auth().currentUser.uid;
                    const totalValidMarks = this.props.assessment.totalValidMarks;
                    const totalNumberOfQuestions = this.props.assessment.questions.length
                    const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode']; 
                    const admissionNumber = JSON.parse(localStorage.getItem('easystudy-user'))['admissionNumber']; 
                    const userClassDoc = await db.collection('students').where('schoolCode', '==', schoolCode).where('admissionNumber', '==', admissionNumber).get()
                    const userClass = userClassDoc.docs[0].data()['class'];
                    const classLower = userClass.toLowerCase()

                    this.state.response.forEach(item => {
                        if(item.userAnswer === item.question.correctionOption){
                            totalMarksObtained = totalMarksObtained + parseInt(item.question.questionMark)
                            numberOfCorrectAnswers++;
                        }
                        data.push({
                            correctionOption: item.question.correctionOption,
                            selectedOption: item.userAnswer,
                            question: {...item.question},
                            questionNumber: item.index,
                            
                        })
                    })
                    const fullName = JSON.parse(localStorage.getItem('easystudy-user'))['fullName'];
                    await db.collection(`/studentResponse/${schoolCode}/test`).add({
                        response: data,
                        numberOfCorrectAnswers,
                        totalValidMarks,
                        totalMarksObtained,
                        totalNumberOfQuestions,
                        assessmentId,
                        completedAt,
                        studentUserId,
                        studentFullName: fullName,
                        studentClass: classLower,
                        quizName: this.props.assessment.quizName,
                        subject: this.props.assessment.subject,
                        validUntil: this.props.assessment.validUntil,
                        
                    })
                    this.props.initiateLoading(false)
                    swal.fire(
                        'Good job!',
                        'You have successfully submitted assessment',
                        'success'
                      ).then((value) => {
                          this.props.history.goBack()
                      })
                }
            })
        }
        this.setState({
            currentIndex: this.state.currentIndex + 1
        })
    }
    goBack = () => {
        if(this.state.currentIndex === 0 ){
            return ;
        }
        this.setState({
            currentIndex: this.state.currentIndex - 1
        })
    }
    getAssessments = () => {
        const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode'];
        const admissionNumber = JSON.parse(localStorage.getItem('easystudy-user'))['admissionNumber'];
        db.collection('students').where('admissionNumber', '==', admissionNumber).where('schoolCode', '==', schoolCode)
            .onSnapshot(docs => {
                if(!docs.empty){
                    const userClass = docs.docs[0].data()['class']
                    console.log(userClass)
                    const classLower = userClass.toLowerCase()
                    db.collection('assessments').where('schoolCode', '==', schoolCode)
                    .where('studentClass', '==', classLower).onSnapshot(this.onDocmentSnapshot)
                }
            })
    }
    onDocmentSnapshot = (doc) => {
        console.log(doc.docs[0].id)
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

    startQuiz = () => {
        this.props.history.push('/student/take-quiz')
    }
    onChoiceSelected = (option) => {
        const response = this.state.response;
        const index = response.findIndex(item => item.index === this.state.currentIndex);
        if(index !== -1){
            response.splice(index,1)
        }
        response.push({
            index: this.state.currentIndex,
            question: this.props.assessment.questions[this.state.currentIndex],
            userAnswer: option
        })
        this.setState({
            response: [...response]
        })
    }

    isOptionSelected = (option) => {
        const response = this.state.response;
        const index = response.findIndex(item => item.index === this.state.currentIndex);
        if(index !== -1){
           const questionResponse = response.find(item => item.index === this.state.currentIndex);
           if(questionResponse.userAnswer === option.option){
               return true;
           }
           return false;
        }
        return false;
    }
    
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
                            <div className="row">
                                <div className="col-md-6 border-right">
                                    <p>
                                        {
                                            this.props.assessment.questions[this.state.currentIndex].question
                                        }
                                    </p>
                                </div>
                                <div className="col-md-6">
                                        {
                                            this.props.assessment.questions[this.state.currentIndex].options.map((option, i) => {
                                                if((option.option && option.option.trim() === '') || (option.answer && option.answer.trim() === '')){
                                                    return null
                                                }
                                                if(this.isOptionSelected(option)){
                                                    return <Choice isOptionSelected={true} key={i} selectedChoice={this.onChoiceSelected} option={option.option} answer={option.answer} />
                                                }
                                                return <Choice isOptionSelected={false} key={i} selectedChoice={this.onChoiceSelected} option={option.option} answer={option.answer} />
                                            })
                                        }
                                </div>
                            </div>
                            <div className="row mt-3 justify-content-center">
                                <button onClick={this.goToPrevious} className="btn btn-primary mx-3">Previous</button>
                                <button onClick={this.goToNext} className="btn  btn-secondary">Next</button>
                            </div>
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

export default connect(mapStateToProps, actions)(Quiz)