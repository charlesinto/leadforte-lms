import React, { Component } from 'react';

class Choice extends Component {
    goToCourseDetail = (e, id) => {
        this.props.selectedChoice(id)
    }
  render() {
    return (
        <div key={this.props.id}  style={{cursor:'pointer'}} onClick={(e) => this.goToCourseDetail(e, this.props.option)} className="card-group-row__col ">
        <div id="choice" className={`card  border ${this.props.isOptionSelected ? 'border-success' : ''} choice card-group-row__card`}>
            <div className="card-body d-flex">
                
                <div className="d-flex flex-column">
                    <div className="mb-3 d-flex">
                            <span className="px-3">{this.props.option}</span>
                            <strong>{this.props.answer}</strong>
                    </div>
                </div>
                {/* <p className="text-muted">Become a SCRUM master in scheduling tasks.</p> */}

                {/* <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <span className="badge badge-pill badge-soft-secondary">
                            2 days left
                        </span>
                    </div>
                    <div className="h4 text-primary">$49</div>
                </div> */}
            </div>
        </div>
    </div>
    );
  }
}

export default Choice
