import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Material extends Component {
  render() {
    return (
        <li onClick={() => this.props.selectedMaterial(this.props.material)} class="list-group-item" key={this.props.material.id}>
            <div class="media">
                <div class="media-left mr-1">{this.props.count}</div>
                <div class="media-body">
                    <Link  to="#">{this.props.material.file_name}</Link>
                </div>
                <div class="media-right">
                    <small></small>
                </div>
            </div>
        </li>
    );
  }
}

//class="text-white"

export default  Material;
