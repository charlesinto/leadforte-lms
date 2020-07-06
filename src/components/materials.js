import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Material extends Component {
    renderfileType =material => {
        switch(material.file_type){
            case 'pdf':

            return <span style={{color: 'red'}}><i className="fas fa-file-pdf"></i></span>
            case 'video':
                
            return <span style={{color: 'red'}}><i className="fas fa-video"></i></span>

            case 'audio':

                return <span style={{color: 'red'}}><i class="far fa-file-audio"></i></span>

            case 'ppt':
                return <span style={{color: 'red'}}><i class="fas fa-file-powerpoint"></i></span>
            case 'doc':
                return <span style={{color: 'red'}}><i class="far fa-file-word"></i></span>

            default:
                return <span style={{color: 'red'}}><i className="fas fa-volume-off"></i></span> 
             
        }
    }
  render() {
    return (
        <li onClick={() => this.props.selectedMaterial(this.props.material)} className="list-group-item" key={this.props.material.id}>
            <div className="media">
                <div className="media-left mr-1">{this.props.count}</div>
                <div className="media-body">
                    <Link  to="#">{this.props.material.file_name}</Link>
                </div>
                <div className="media-right">
                <small>{this.renderfileType(this.props.material)}</small>
                </div>
            </div>
        </li>
    );
  }
}

//class="text-white"

export default  Material;
