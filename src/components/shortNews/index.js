import React, { Component } from "react";
import "./styles.css";
import moment from "moment";
import { Link } from "react-router-dom";
class ShortNews extends Component {
  render() {
    const { time } = this.props;
    return (
      <div className="card mt-1">
        <div className="row align-items-center">
          <div className="col-sm-4">
            <img src={this.props.thumb} className="img-fluid" alt="News Img" />
          </div>
          <div className="card-body col-sm-8">
            <Link to={"/article/" + this.props.id}>
              <h6 className="card-title">{this.props.title}</h6>
            </Link>
            <p className="card-text">{this.props.desc}</p>
            <span>Tác giả: {this.props.author}</span>
            <br />
            <span>Danh mục: {this.props.category}</span>
            <br />
            <span>{moment(time).format("HH:mm DD-MM-YYYY")}</span>

            <div>
              <div className="badge badge-primary">Tags:</div>

              {this.props.tags.map(item => {
                return <Link to={"/tags/"+item.id+"/"+item.name} key={item.id} className="ml-1 badge badge-warning">{item.name}</Link>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortNews;
