import React, { Component } from 'react';
import Dashboard from '../hoc/dashboard';
import * as actions from "../redux/actions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import Course from '../components/course';
import ReactPlayer from 'react-player'
import Material from '../components/materials';

class AuditCourse extends Component {
  state = {
    materials: [
        {
          "id": "1",
          "file_name": "Parts of Speech",
          "file_url": "http://www.umyu.easystudy.com.ng/materials/pdf/pdffile236.pdf",
          "file_type": "pdf",
          "subject": "English Language",
          "subject_id": "1"
        },
        {
          "id": "232",
          "file_name": "Simultaneous Equation",
          "file_url": "http://www.digitalschool.easystudy.com.ng/teacher/dashboard/materials/pdf/pdffile1.pdf",
          "file_type": "pdf",
          "subject": "English Language",
          "subject_id": "1"
        },
        {
          "id": "242",
          "file_name": "damola",
          "file_url": "http://www.cbccollege.easystudy.com.ng/admin/dashboard/materials/video/videofile1.mp4",
          "file_type": "video",
          "subject": "English Language",
          "subject_id": "1"
        },
        {
          "id": "243",
          "file_name": "damola",
          "file_url": "http://www.cbccollege.easystudy.com.ng/admin/dashboard/materials/video/videofile1.mp4",
          "file_type": "video",
          "subject": "English Language",
          "subject_id": "1"
        },
        
      ],
    courses: '1',
    material: {}
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
  selectedMaterial = material => {
      console.log(material)
      this.setState({
          material: material
      })
  }
  showIframe = material => {
    switch(material.file_type){
      case 'pdf':
        console.log('val pdf')
      return ( <object data={material.file_url} type="application/pdf">
          <iframe class="embed-responsive-item" title="Book" allowFullScreen src={`https://docs.google.com/viewer?url=${material.file_url}&embedded=true`}></iframe>
      </object>)
      case 'doc':
        console.log('val pdf')
      return ( <object data={material.file_url} type="application/pdf">
          <iframe class="embed-responsive-item" title="Book" allowFullScreen src={`https://docs.google.com/viewer?url=${material.file_url}&embedded=true`}></iframe>
      </object>)
      case 'ppt':
        console.log('val pdf')
      return ( <object data={material.file_url} type="application/pdf">
          <iframe class="embed-responsive-item" title="Book" allowFullScreen src={`https://docs.google.com/viewer?url=${material.file_url}&embedded=true`}></iframe>
      </object>)
      case 'video':
        console.log('val video')
        return ( <object data={material.file_url}>
        <iframe class="embed-responsive-item" title="vidoe" allowFullScreen src={`https://docs.google.com/viewer?url=${material.file_url}&embedded=true`}></iframe>
    </object>)
      case 'audio':
        console.log('val audio')
      return ( <object data={material.file_url}>
      <iframe class="embed-responsive-item" title="audo" allowFullScreen src={`https://docs.google.com/viewer?url=${material.file_url}&embedded=true`}></iframe>
  </object>)
      default:
        return (
          <iframe title="video" class="embed-responsive-item" src={"https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"} allowfullscreen></iframe>
        )
    }
  }
  render() {
    return (
      <Dashboard>
           <div className="mdk-drawer-layout__content page">
              <div className="container-fluid page__heading-container">
                          <div className="page__heading d-flex align-items-center justify-content-between">
                              <h1 className="m-0">Audit Subject</h1>
                              <Link to="/student/courses" className="btn btn-success ml-3">Go to Subjects <i className="material-icons">arrow_forward</i></Link>
                          </div>
                      </div>
                <hr />

                <div className="container-fluid page__containe">
                      
                <div class="container-fluid page__container mt-4 mb-4">
                        <div class="row" style={{height:400}}>
                            <div class="col-md-4" data-perfect-scrollbar>
                                <div class="card clear-shadow border">
                                    <div class="card-body ">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <strong>{this.state.materials[0].file_name}</strong>
                                            {/* <small class="text-muted">3h 50min</small> */}
                                        </div>
                                        <div>
                                            <span class="mr-2">
                                                <Link to="#" class="rating-link active"><i class="material-icons icon-16pt">star</i></Link>
                                                <Link to="#" class="rating-link active"><i class="material-icons icon-16pt">star</i></Link>
                                                <Link to="#" class="rating-link active"><i class="material-icons icon-16pt">star</i></Link>
                                                <Link to="#" class="rating-link active"><i class="material-icons icon-16pt">star</i></Link>
                                                <Link to="#" class="rating-link active"><i class="material-icons icon-16pt">star_half</i></Link>
                                            </span>
                                            {/* <small class="text-muted">(391 ratings)</small> */}
                                        </div>
                                    </div>
                                </div>
                                <ul class="list-group list-group-fit">

                                    <li class="list-group-item">
                                        <div class="media">
                                            <div class="media-left mr-1">
                                                <div class="text-muted"></div>
                                            </div>
                                            <div class="media-body">
                                                <Link to="#">Materials</Link>
                                            </div>
                                            <div class="media-right">
                                                {/* <small class="text-muted">3:33</small> */}
                                            </div>
                                        </div>
                                    </li>
                                   {
                                       this.state.materials.map((material, i) => {
                                           return  <Material selectedMaterial={this.selectedMaterial} material={material} count={i+1} />
                                       })
                                   }
                                    
                                    
                                    
                                    
                                    
                                    
                                </ul>

                            </div>
                            <div class="col-md-8">

                                <div class="embed-responsive embed-responsive-16by9 mb-4" style={{maxHeight: 400, background: '#0000'}}>
                                    {/* {
                                      console.log(this.state.material)
                                    } */}
                                    {
                                      this.showIframe(this.state.material)
                                    }
                                    {/* {
                                        this.state.material.file_type ?
                                          null 
                                          <iframe title="video" class="embed-responsive-item" src={ "https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"} allowfullscreen></iframe>

                                    } */}
                                   
                                </div>

                            </div>
                        </div>
                        
                                {/* <div className="row mt-4">
                                    {
                                        console.log(this.state.material)
                                    }
                                    {
                                        
                                        this.state.material.file_url && this.state.material.file_type === 'video' ?
                                        <ReactPlayer controls playing light url={this.state.material.file_url} /> : null
                                    }
                                    
                                </div> */}
                        
                        
                    </div>
                </div>
           </div>
     </Dashboard>
    );
  }
}

export default connect(null, actions)(AuditCourse);
