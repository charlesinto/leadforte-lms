import React, { Component } from 'react';
import avatar from "../assets/avatar.png";

class LeftChat extends Component {
  render() {
    return (
        <div className="activity-row activity-row1">
        <div className=" activity-img"><img src={avatar} 
        className="img-responsive" alt="" />
        {/* <span>06:01 AM</span> */}
        </div>
        <div className=" activity-img1">
            <div className="activity-desc-sub">
    <h5>{this.props.author}</h5>
    <p>{this.props.message}</p>
            </div>
        </div>
        <div className="col-xs-4 activity-desc1"></div>
        <div className="clearfix"> </div>
    </div>
    );
  }
}

export default LeftChat;
