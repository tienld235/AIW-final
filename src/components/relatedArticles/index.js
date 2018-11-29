import React, { Component } from "react";
import { Link } from "react-router-dom";
class RelatedArticles extends Component {
  render() {
    return (
      <div className="card mt-1">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <img src={this.props.thumb} className="img-fluid" alt="News Img" />
          </div>
          <div className="card-body col-sm-6">
            <Link to={"/article/" + this.props.id}>
              <h6 className="card-title">{this.props.title}</h6>
            </Link>
            {/* <p className="card-text">{this.props.desc}</p> */}
            <span>Time: {this.props.time}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedArticles;
