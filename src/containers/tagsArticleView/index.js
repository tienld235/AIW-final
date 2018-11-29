import React, { Component } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Axios from "axios";
import { getArticlesByTags } from "../../api/articlesApi";
import ShortNews from "../../components/shortNews";
import CategoriesList from "../../components/categoriesList";

class TagsArticleView extends Component {
  state = {
    news: [],
    tagName: ""
  };
  componentDidMount() {
    const { match } = this.props;
    this.getArticles(match.params.id);
  }
  getArticles = id => {
    Axios.get(getArticlesByTags(id))
      .then(response => this.setState({ news: response.data.rows }))
      .catch(error => console.log(error));
  };

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match !== prevProps.match) {
      this.getArticles(match.params.id);
    }
  }
  render() {
    const { news } = this.state;
    const { match } = this.props;

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-9">
              <h5 className="card-header text-center">
                Tin theo tag "{match.params.name}"
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
                  time={item.createdAt}
                  tags={item.tags}
                />
              ))}
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
export default TagsArticleView;
