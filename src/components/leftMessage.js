import React, { Component } from 'react';
import avatar from "../assets/avatar.png";

class LeftChat extends Component {
  renderMessage = (message = '') => {
    const expression1 = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    // const expression2 = (https?://\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})
    const expression2 =  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex1 = new RegExp(expression1)
    const regex2 = new RegExp(expression2)
    if(message.match(regex1) || message.match(regex2)){
      return <p><a href={message} target="_blank" rel="noopener noreferrer">{message}</a></p>
    }
    return <p>{message}</p>
  }
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
      {this.renderMessage(this.props.message)}
            </div>
        </div>
        <div className="col-xs-4 activity-desc1"></div>
        <div className="clearfix"> </div>
    </div>
    );
  }
}

export default LeftChat;
