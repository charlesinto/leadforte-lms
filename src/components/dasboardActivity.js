import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    return (
      
        <div className="list-group-item list-group-item-action d-flex align-items-center ">
        <div className="avatar avatar-xs mr-3">
            <span className="avatar-title rounded-circle bg-primary">
                <img src={process.env.PUBLIC_URL+ "/assets/images/logo.svg"} width="20" alt="avatar"/>
            </span>
        </div>


        <div className="flex">
            <div className="d-flex align-items-middle">
                <div className="avatar avatar-xxs mr-1">
                    <img src={process.env.PUBLIC_URL+"/assets/images/256_rsz_1andy-lee-642320-unsplash.jpg"} alt="Avatar" className="avatar-img rounded-circle"/>
                </div>


                <strong className="text-15pt mr-1">Jenell D. Matney</strong>
            </div>
            <small className="text-muted">4 days ago</small>
        </div>
        <div>$573</div>


        <i className="material-icons icon-muted ml-3">arrow_forward</i>
    </div>
    );
  }
}
