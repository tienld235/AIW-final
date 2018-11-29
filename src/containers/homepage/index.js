import React, { Component } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ShortNews from "../../components/shortNews";
import Axios from "axios";
import _ from "lodash";
import { getLimitArticles } from "../../api/articlesApi";
import CategoriesList from "../../components/categoriesList";

class HomePage extends Component {
  state = {
    news: [],
    pagination: 0,
    page: 1
  };
  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    Axios.get(getLimitArticles(15, this.state.page))
      .then(response => {
        this.setState({
          news: response.data.rows,
          pagination: Math.floor(response.data.count / 15)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps, prevStates) {
    const { page } = this.state;
    if (page !== prevStates.page) {
      this.loadArticles();
    }
  }

  changePage = page => {
    this.setState({ page });
  };

  render() {
    const { news, page, pagination } = this.state;
    return (
      <div className="container-fluid">
        <Header />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <h5 className="card-header text-center">Tin mới</h5>
              {news.map(item => (
                <ShortNews
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  author={item.author}
                  category={item.category.name}
                  desc={item.desc}
                  thumb={item.thumb}
                  time={item.createdAt}
                  tags={item.tags}
                />
              ))}

              <ul className="pagination justify-content-center mt-2">
                <li
                  className={`page-item ${page === 1 && "disabled"}`}
                  onClick={() =>
                    page > 1 &&
                    this.setState(({ page }) => ({ page: page - 1 }))
                  }
                >
                  <span className="page-link">Previous</span>
                </li>
                {_.fill(Array(pagination), null).map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${page === i + 1 && "active"}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => this.changePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${page === pagination && "disabled"}`}
                  onClick={() =>
                    page < pagination &&
                    this.setState(({ page }) => ({ page: page + 1 }))
                  }
                >
                  <span className="page-link">Next</span>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <CategoriesList />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default HomePage;
