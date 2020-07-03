
import React, { Component } from 'react';
import avatar from "../assets/avatar.png";

class RightMessage extends Component {
  render() {
    return (
        <div className="activity-row activity-row1 w-100 justify-content-end">

        <div className=" activity-img">
            <div className="activity-desc-sub2">
                <h5>{this.props.author}</h5>
                <p>{this.props.message}</p> 
            </div>
        </div>
        <div className=" activity-img"><img src={avatar} className="img-responsive" alt="" />
        {/* <span>06:01 AM</span> */}
        </div>
        <div className="col-xs-4 activity-desc1"></div>
        <div className="clearfix"> </div>
    </div>
    );
  }
}

export default RightMessage;
