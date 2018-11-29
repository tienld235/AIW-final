import React, { Component } from "react";
import "./styles.css";
import HeaderLogo from "../../assets/images/article.png";
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to={"/"}>
          <div className="container pt-2" style={{display: 'flex', flexDirection: "row"}}>
            <img
              src={HeaderLogo}
              width={130}
              height={130}
              className=""
              alt="Header Logo"
            />
            <h1 className="text-danger" style={{marginLeft: 16}}>The Articles</h1>
          </div>
        </Link>
        <div />
      </div>
    );
  }
}

export default Header;
