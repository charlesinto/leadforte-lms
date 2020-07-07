import React, { useEffect, useState, useCallback } from 'react';
import { connect, useDispatch } from "react-redux";
import * as actions from "../redux/actions";
import Dashboard from '../hoc/dashboard';
import { SET_ACTIVE_LINK } from '../redux/types';
import {Jutsu} from './Jutsu';
import {auth, db} from '../database'
import Swal from 'sweetalert2';
import loader from '../assets/loader.svg';

const LoadingComponent = () => {
    return (
        <div className="container py-5 px-5 mb-5 d-flex flex-column justify-content-center align-items-center" style={{minHeight:'16rem', height:'100%'}}>
            <div className="">
                    <img src={loader} alt="loader"  />
            </div>
            <div className="mt-5 mb-5 pb-5 d-flex justify-content-center">
               <h4 className="mb-10">We are starting your video session...</h4> 
            </div>
        </div>
    )
}

const TeacherVideoCall = (props) => {
    
    const dispatch = useDispatch();
    const [room, setRoom] = useState('')
    const [name, setName] = useState('')
    const [call, setCall] = useState(false)
    const [password, setPassword] = useState('')
    const parentNode = "jitsi-container"
    const [online, setOnline] = useState(true)
    const [teacherClass, setClass] = useState([])
    const [target, setTarget] = useState('')
    const [message, setMessage] = useState('')
    
    const initFetch = useCallback(() => {
        const uid =  (auth().currentUser).uid
        db.collection('teachers').where('uid', '==', uid).onSnapshot(doc => {
            if(!doc.empty){
                const classes = doc.docs[0].data()['classes']
                setClass(classes)
            }
        })
      }, [setClass]);
    
    const renderJustsu = () => {
        return (<div className="jitsi-container-wrapper" style={{width:'100vw'}} >
            
            {/* <div id={parentNode} /> */}
                <Jutsu
            roomName={room}
            displayName={name}
            password={password}
            onMeetingEnd={onMeetingEnd}
            loadingComponent={<LoadingComponent />} />
        </div>
        )
    }
    const onMeetingEnd = () => {
        setCall(false)
        setName('')
        setPassword('')
        setRoom('')
        Swal.fire('Meeting Ended', 'Meeting ended successfully', 'success')
    }
    const toggleModal = () => {
        window.$('#invitationModal').modal('show')
    }
    const handleClick = event => {
        console.log(window.JitsiMeetExternalAPI)
        event.preventDefault()
        if (room && name) {
            if(!window.navigator.onLine){
                return Swal.fire('No Network', 'No network connectivity found, please try again', 'info')
            }
            return setCall(true)
        }
        
        Swal.fire('Error starting video session', 'Please provide the room name and your username for the call', 'error')
      }
      const broadCastMeeting = async () => {
          if(message.trim() === '' || target.trim() === '' ){
            return  Swal.fire('Error Sending Invitation', 'Please provide the invitation link and select class', 'info')
          }

          const fullName = JSON.parse(localStorage.getItem('easystudy-user'))['fullName'];
          const uid =  (auth().currentUser).uid
            const data = {
                message,
                createdBy: fullName,
                uid,
                createdAt: new Date()
            }
            const schoolCode = JSON.parse(localStorage.getItem('easystudy-user'))['schoolCode']
            await db.collection(`/chats/${schoolCode}/${target}`).add({...data})
            window.$('#invitationModal').modal('hide')
          return  Swal.fire('Invitation Successful', 'Invitation sent successfully', 'success')
      }
    const renderScheduleCall = () => {
        return (
            <div className="container">
                <div className="d-flex w-100 py-5 px-3 justify-content-center align-items-center">
                    <div className="">
                        <div className="row justify-content-center">
                                <span className="icon">
                                            <i class="fas fa-video"></i>
                                </span>
                        </div>
                        <div className="row justify-content-center mb-5">
                            <h3>Start a video session</h3>
                        </div>
                        <div className="row">
                            <form class="form-inline">
                                
                                <div class="form-group mx-sm-3 mb-2">
                                    <label for="inputPassword2" class="sr-only">Room Name</label>
                                    <input type="text" onChange={(e) => setRoom(e.target.value)} class="form-control" id="inputPassword2" placeholder="Room Name" />
                                </div>
                                <div class="form-group mx-sm-3 mb-2">
                                    <label for="inputPassword3" class="sr-only">User Name</label>
                                    <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} id="inputPassword3" placeholder="User Name" />
                                </div>
                                <div class="form-group mx-sm-3 mb-2">
                                    <label for="inputPassword4" class="sr-only">Password (not required)</label>
                                    <input type="text" class="form-control" onChange={(e) => setPassword(e.target.value)} id="inputPassword4" placeholder="Password (optional)" />
                                </div>
                                <button onClick={handleClick} type="submit" class="btn btn-primary mb-2">
                                    <i class="fas fa-video"></i> Start Call
                                </button>
                                </form>
                        </div>
                        <div className="row">
                            <div  className="fab-wrapper" title="Make an announcement">
                                <div className="fab-container shadow d-flex justify-content-center align-items-center">
                                        <span>
                                            <i className="fas fa-bullhorn"></i>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
    const renderApp = () => {
        switch(call){
            case true:
            
                return renderJustsu()
            case false:
                return renderScheduleCall()
            default:
                return null
        }
    }
    useEffect(() => {
        dispatch({type: SET_ACTIVE_LINK, payload: 'videocall'})
        initFetch()
          window.addEventListener('online', () => setOnline(true));
        window.addEventListener('offline', () => setOnline(false));
          
        
    }, [dispatch, setOnline, initFetch])
    return (
        <Dashboard>
            <div class="mdk-drawer-layout__content page">
                {renderApp()}
                <div className="row">
                    <div  className="fab-wrapper" title="Make an announcement">
                        <div onClick={toggleModal} className="fab-container shadow d-flex justify-content-center align-items-center">
                                <span>
                                    <i className="fas fa-bullhorn"></i>
                                </span>
                        </div>
                    </div>
                </div>
                <div class="modal fade" data-backdrop="static" data-keyboard="false" id="invitationModal" tabindex="-1" role="dialog" aria-labelledby="invitationModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Invite to Chat</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="#" className="mb-5">
                        <div className="">
                            

                            <div className="mb-3 ml-auto">
                                    <div className="form-group">
                                        <label className="text-label" htmlFor="phoneNumber">Select Class</label>
                                        <div className="input-group input-group-merge">
                                            <select value={target} name="target" onChange={(e) => setTarget(e.target.value)} id="custom-select" className="form-control custom-select" style={{width:200}} >
                                                                        {/* <option selected>All categories</option> */}
                                                                        <option selected>Choose</option>
                                                    {
                                                        teacherClass.map(item => {
                                                            return <option value={item.class}>{item.class}</option>
                                                        })
                                                    }
                                                </select>
                                        </div>
                                    </div>
                                
                            </div>
                            <div className="mb-3 ml-auto">
                                <div className="form-group">
                                    <label className="text-label" htmlFor="message">Invitation Link</label>
                                    <div className="input-group input-group-merge d-flex flex-column">
                                        <input name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control custom-select" /><br />
                                        {/* <span>Maximum length of 500 characters</span> */}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </div>  
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onClick={broadCastMeeting} class="btn btn-primary">Send</button>
                </div>
                </div>
            </div>
            </div>
            </div> 
        </Dashboard>
    )
}



export default connect(null, actions)(TeacherVideoCall)
