import React, { Component } from 'react';
import Dashboard from '../hoc/dashboard';
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
// import DashboardFeaturedCourse from '../components/dashboardFeaturedCourseCard';
import Course from '../components/course';

class StudentCourses extends Component {
  state = {
    subject: [
      {
        "id": "1",
        "subject": "English Language"
      },
      {
        "id": "2",
        "subject": "Verbal Reasoning"
      },
      {
        "id": "3",
        "subject": "Spelling"
      },
      {
        "id": "4",
        "subject": "Mathematics"
      },
      {
        "id": "5",
        "subject": "Quantitative Reasoning"
      },
      {
        "id": "6",
        "subject": "Elementary Science"
      },
      {
        "id": "7",
        "subject": "Social Studies"
      },
      {
        "id": "8",
        "subject": "Vocational Aptitude"
      },
      {
        "id": "9",
        "subject": "Health Education"
      },
      {
        "id": "10",
        "subject": "Bible Knowledge"
      },
      {
        "id": "11",
        "subject": "Languages"
      },
      {
        "id": "12",
        "subject": "Creative Arts"
      },
      {
        "id": "13",
        "subject": "Computer"
      },
      {
        "id": "14",
        "subject": "Agric Science"
      },
      {
        "id": "15",
        "subject": "Home Economics"
      },
      {
        "id": "16",
        "subject": "Civic"
      },
      {
        "id": "17",
        "subject": "Music"
      },
      {
        "id": "18",
        "subject": "Moral Instruction"
      },
      {
        "id": "19",
        "subject": "Handwriting"
      }
    ],
    primary: [
      {
        "id": "1",
        "subject": "English Language"
      },
      {
        "id": "2",
        "subject": "Verbal Reasoning"
      },
      {
        "id": "3",
        "subject": "Spelling"
      },
      {
        "id": "4",
        "subject": "Mathematics"
      },
      {
        "id": "5",
        "subject": "Quantitative Reasoning"
      },
      {
        "id": "6",
        "subject": "Elementary Science"
      },
      {
        "id": "7",
        "subject": "Social Studies"
      },
      {
        "id": "8",
        "subject": "Vocational Aptitude"
      },
      {
        "id": "9",
        "subject": "Health Education"
      },
      {
        "id": "10",
        "subject": "Bible Knowledge"
      },
      {
        "id": "11",
        "subject": "Languages"
      },
      {
        "id": "12",
        "subject": "Creative Arts"
      },
      {
        "id": "13",
        "subject": "Computer"
      },
      {
        "id": "14",
        "subject": "Agric Science"
      },
      {
        "id": "15",
        "subject": "Home Economics"
      },
      {
        "id": "16",
        "subject": "Civic"
      },
      {
        "id": "17",
        "subject": "Music"
      },
      {
        "id": "18",
        "subject": "Moral Instruction"
      },
      {
        "id": "19",
        "subject": "Handwriting"
      }
    ],
    junior: [
      {
        "id": "20",
        "subject": "Mathematics"
      },
      {
        "id": "21",
        "subject": "English Language"
      },
      {
        "id": "22",
        "subject": "Yoruba"
      },
      {
        "id": "23",
        "subject": "Igbo"
      },
      {
        "id": "24",
        "subject": "Hausa"
      },
      {
        "id": "25",
        "subject": "Basic Science"
      },
      {
        "id": "26",
        "subject": "Social Studies"
      },
      {
        "id": "27",
        "subject": "Agricultural Science"
      },
      {
        "id": "28",
        "subject": "Civic Education"
      },
      {
        "id": "29",
        "subject": "Christian Religion Studies"
      },
      {
        "id": "30",
        "subject": "Physical and Health Education"
      },
      {
        "id": "31",
        "subject": "Business Studies"
      },
      {
        "id": "32",
        "subject": "French"
      },
      {
        "id": "33",
        "subject": "Computer Studies"
      },
      {
        "id": "34",
        "subject": "Music"
      },
      {
        "id": "35",
        "subject": "Basic Technology"
      },
      {
        "id": "36",
        "subject": "Fine Arts/Creative Art\r\n"
      },
      {
        "id": "37",
        "subject": "English Language"
      },
      {
        "id": "75",
        "subject": "Chinese"
      },
      {
        "id": "76",
        "subject": "Spanish"
      },
      {
        "id": "77",
        "subject": "Russian"
      },
      {
        "id": "78",
        "subject": "Greek"
      }
    ],
    senior: [
      {
        "id": "38",
        "subject": "Mathematics"
      },
      {
        "id": "39",
        "subject": "Civic Education"
      },
      {
        "id": "40",
        "subject": "Biology"
      },
      {
        "id": "41",
        "subject": "Physics"
      },
      {
        "id": "42",
        "subject": "Chemistry"
      },
      {
        "id": "43",
        "subject": "Further Mathematics"
      },
      {
        "id": "44",
        "subject": "Health and Physical Education"
      },
      {
        "id": "45",
        "subject": "Computer Science"
      },
      {
        "id": "46",
        "subject": "Technical Drawing (Applied Science)"
      },
      {
        "id": "47",
        "subject": "Food and Nutrition"
      },
      {
        "id": "48",
        "subject": "Agricultural Science"
      },
      {
        "id": "49",
        "subject": "Financial Account"
      },
      {
        "id": "50",
        "subject": "Book Keeping"
      },
      {
        "id": "51",
        "subject": "Typewriting"
      },
      {
        "id": "52",
        "subject": "Office Practice"
      },
      {
        "id": "53",
        "subject": "Commerce"
      },
      {
        "id": "54",
        "subject": "Data Processing"
      },
      {
        "id": "55",
        "subject": "Economics"
      },
      {
        "id": "56",
        "subject": "Government"
      },
      {
        "id": "57",
        "subject": "Literature-in-English"
      },
      {
        "id": "58",
        "subject": "Christian Religion Knowledge"
      },
      {
        "id": "59",
        "subject": "Fine Art/Creative Art"
      },
      {
        "id": "60",
        "subject": "French"
      },
      {
        "id": "61",
        "subject": "Geography"
      },
      {
        "id": "74",
        "subject": "Chinese"
      }
    ],
    courses: '1'
  }
  async componentDidMount(){
    try{
      this.props.setActiveLink('studentCourses')
      this.props.initiateLoading(true)
      const appDomain = localStorage.getItem('appDomain')
      const primarySchool = await axios.get(appDomain+'read.php?id=2')
      console.log(primarySchool.data)
      const juniorSchool = await axios.get(appDomain +'read.php?id=3')
      const seniorschool = await axios.get(appDomain +'read.php?id=4')
    }catch(error){
      console.log(error.response)
      this.props.initiateLoading(false)
    }
  }
  handleOnChange = (e) => {
    const {target: {name, value}} = e;
    this.setState({
      [name]: value
    }, () => {
      switch(this.state.courses){
        case '1':
          this.setState({
            subject: [...this.state.primary]
          })
          break;
        case '2':
          this.setState({
            subject: [...this.state.junior]
          })
          break;
        case '3':
          this.setState({
            subject: [...this.state.senior]
          })
        break;
        default:
          return ;
      }
    })
  }
  render() {
    return (
      <Dashboard>
           <div className="mdk-drawer-layout__content page">
              <div className="container-fluid page__heading-container">
                          <div className="page__heading d-flex align-items-center justify-content-between">
                              <h1 className="m-0">Subjects</h1>
                              {/* <Link to="#" className="btn btn-success ml-3">Go to Courses <i className="material-icons">arrow_forward</i></Link> */}
                          </div>
                      </div>
                <hr />

                <div className="container-fluid page__containe">
                      <form action="#" className="mb-5">
                            <div className="d-lg-flex">
                                <div className="search-form mb-3 mr-3-lg search-form--light">
                                    <input type="text" className="form-control" placeholder="Search courses" id="searchSample02" />
                                    <button className="btn" type="button"><i className="material-icons">search</i></button>
                                </div>

                                <div className="form-inline  mb-3 ml-auto">
                                    <div className="form-group mr-3">
                                        <label for="custom-select" className="form-label mr-1">Category</label>
                                        <select value={this.state.courses} name="courses" onChange={this.handleOnChange} id="custom-select" className="form-control custom-select" style={{width:200}} >
                                            {/* <option selected>All categories</option> */}
                                            <option value="1">Primary School</option>
                                            <option value="2">Junior Secondary School</option>
                                            <option value="3">Senior Secondary School</option>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                        </form>
                      <div className="row">
                          {
                            this.state.subject.map(subject => {
                              return <Course title={subject.subject} id={subject.id} />
                            })
                          }
                      </div>
                </div>
           </div>
     </Dashboard>
    );
  }
}

export default connect(null, actions)(StudentCourses);
