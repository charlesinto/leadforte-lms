import React, { Component } from 'react';
import Dashboard from "../hoc/dashboard";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import LeftChat from '../components/leftMessage';
import RightMessage from '../components/rightChat';
import { db, auth } from "../database";
 class ClassRoom extends Component {
     state = {
       chats: [],
       uid: '',
       message: '',
       userClass: ''
     }
    componentDidMount(){
        this.getCurrentUser()
        this.props.setActiveLink('classroom')
        
    }
    getCurrentUser =  () => {
      const uid =  (auth().currentUser).uid
      this.setState({uid}, () => this.getChats())
    }
    getChats = async () => {
      
      const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode'];
      const admissionNumber = JSON.parse(localStorage.getItem('easystudy-user'))['admissionNumber'];
      const userClassDoc = db.collection('students').where('admissionNumber', '==', admissionNumber).get()
      if(!(await userClassDoc).empty){
        const userClass = (await userClassDoc).docs[0].data()['class']
        this.setState({
          userClass
        }, () => {
          db.collection(`/chats/${schoolCode}/${userClass}`).onSnapshot(this.onDocmentSnapshot)
        })
        
      }
        
    }
    onDocmentSnapshot = (doc) => {
      if(!doc.empty){
          const data = [];
          doc.docs.forEach(chats => {
              data.push({
                  id: chats.id,
                  ...chats.data()
              })
          })
          data.sort(this.sortAscending)
          this.setState({
              chats: [...data]
          })
      }
  }
  sortDescending = (a,b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return b.createdAt - a.createdAt;
  }
  sortAscending = (a,b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return a.createdAt - b.createdAt
  }
  handleOnChange = (e) => {
    const {target: {name, value}} =e;
    this.setState({
      [name]: value
    })
  }
  submit = async (e) => {
    e.preventDefault();
    if(this.state.message.trim() !== ''){
      const fullName = JSON.parse(localStorage.getItem('easystudy-user'))['fullName'];
      const data = {
        message: this.state.message,
        createdBy: fullName,
        uid: this.state.uid,
        createdAt: new Date()
      }
      const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode'];
      this.setState({
        message: ''
      })
      await db.collection(`/chats/${schoolCode}/${this.state.userClass}`).add({...data})
    }
  }
  render() {
    return (
      <Dashboard> 
          <div className="mdk-drawer-layout__content page">
              <div className="container chat-body" style={{position:'relative', height:'100vh', overflowY:'hidden'}}>
              <div className="row">
                {
                  this.state.chats.map(chat => {
                    if(chat.uid === this.state.uid){
                      return <RightMessage author={chat.createdBy} message={chat.message} />
                    }
                    return <LeftChat author={chat.createdBy} message={chat.message} />
                  })
                }
                

                

                        

                        

                        

              </div>
              <div class="search-wrapper-text">
                <div class="d-flex">
                    <div class="d-flex mx-5" style={{flex: 4}}>
                        <input type="text" value={this.state.message} name="message" onChange={this.handleOnChange} placeholder="Type a message"/>
                    </div>
                    <div class="d-flex mx-5"style={{flex: 1}}>
                        <button onClick={this.submit} class=" btn btn-primary">
                        <i class="far fa-paper-plane mx-2"></i> SEND</button>
                    </div>
                </div>
              </div>
              </div>
              
        </div> 
        </Dashboard>
    );
  }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(ClassRoom);
