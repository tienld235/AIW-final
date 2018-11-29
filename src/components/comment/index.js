import React, { Component } from "react";
import moment from 'moment';
class CommentComponent extends Component {
  render() {
    return (
      <div className="row p-2 align-items-center">
        <div className="col-sm-1 offset-sm-2">
          <img
            src={this.props.avatar}
            className="img-fluid"
            width={40}
            height={40}
            alt="User Avatar"
          />
        </div>
        <div className="col-sm-8">
          <h5>
            {this.props.name} (<small>{this.props.email}</small>)
          </h5>
          <p className="card-text">{this.props.content}</p>
          <p className="card-text">{moment(this.props.createdAt).format("HH:mm DD-MM-YYYY")}</p>
        </div>
      </div>
    );
  }
}

export default CommentComponent;
