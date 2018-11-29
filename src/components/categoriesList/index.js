import React, { Component } from "react";
import { getAllCategories } from "../../api/categoriesApi";
import Axios from "axios";
import { Link } from "react-router-dom";

class CategoriesList extends Component {
  state = {
    categories: []
  };
  componentWillMount() {
    Axios.get(getAllCategories())
      .then(response => {
        this.setState({ categories: response.data.rows });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { categories } = this.state;
    return (
      <div className="">
        <h5 className="card-header text-center">Chuyên mục</h5>
        {categories.map(item => (
          <Link to={"/categories/" + item.id} key={item.id}>
            <div className="mt-1 border py-2 text-center" key={item.id}>
              <span className="card-text">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
export default CategoriesList;
