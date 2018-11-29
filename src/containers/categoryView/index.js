import React, { Component } from "react";
import Axios from "axios";
import { getRelatedArticles } from "../../api/articlesApi";
import ShortNews from "../../components/shortNews";
import CategoriesList from "../../components/categoriesList";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { withRouter } from "react-router-dom";
import _ from "lodash";

const defaultState = {
  news: [],
  page: 1,
  pagination: 0
};

class CategoryView extends Component {
  state = defaultState;

  getCategoryArticles = (id, page) => {
    Axios.get(getRelatedArticles(id, 15, page))
      .then(response =>
        this.setState({
          news: response.data.rows,
          pagination: Math.floor(response.data.count / 15)
        })
      )
      .catch(error => console.log(error));
  };
  componentDidMount() {
    const { match } = this.props;
    this.getCategoryArticles(match.params.id, this.state.page);
  }

  componentDidUpdate(prevProps, prevStates) {
    const { match } = this.props;
    if (match !== prevProps.match) {
      this.getCategoryArticles(match.params.id, 1);
      this.setState({ page: 1 });
    }
    const { page } = this.state;
    if (page !== prevStates.page) {
      this.getCategoryArticles(match.params.id, page);
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
          <div className="row">
            <div className="col-sm-9">
              <h5 className="card-header text-center">
                {news[0] ? news[0].category.name : ""}
              </h5>
              {news.map(item => (
                <ShortNews
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  author={item.author}
                  category={item.category.name}
                  desc={item.desc}
                  thumb={item.thumb}
                  time={item.time}
                  tags={item.tags}
                />
              ))}

              {pagination === 0 || pagination === 1 ? (
                ""
              ) : (
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
              )}
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

export default withRouter(CategoryView);
