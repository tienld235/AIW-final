import React, { Component } from "react";
import moment from "moment";
import Header from "../../components/header";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { getArticle, getRelatedArticles } from "../../api/articlesApi";
import Footer from "../../components/footer";
import CategoriesList from "../../components/categoriesList";
import RelatedArticles from "../../components/relatedArticles";
import { postComment, getComment } from "../../api/commentsApi";
import CommentComponent from "../../components/comment";

const defaultState = {
  htmlString: "",
  relatedArticles: [],
  comment: "",
  name: "",
  email: "",
  currentComment: [],
  countComment: 0,
  page: 1
};

class ArticleView extends Component {
  state = defaultState;
  componentWillMount() {
    const { match } = this.props;
    this.getArticle(match.params.id);
    this.getCurrentComments(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match !== prevProps.match) {
      this.setState(defaultState);
      this.getArticle(match.params.id);
    }
  }

  handleCommentChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onSubmitComment = event => {
    const { comment, email, name } = this.state;
    const { match } = this.props;
    if (comment !== "" && email !== "" && name !== "") {
      Axios.post(postComment(), {
        email,
        name,
        content: comment,
        article: match.params.id
      })
        .then(response => {
          this.setState({
            currentComment: [...this.state.currentComment, response.data],
            countComment: response.data.count
          });
          alert("Đăng bình luận thành công!");
        })
        .catch(error => console.log(error));
    }
    event.preventDefault();
  };
  getArticle = id => {
    Axios.get(getArticle(id))
      .then(response => {
        this.setState({ htmlString: response.data });
        Axios.get(getRelatedArticles(response.data.category.id, 4, 1))
          .then(response => {
            this.setState({ relatedArticles: response.data.rows });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCurrentComments(id) {
    Axios.get(getComment(id))
      .then(response => {
        this.setState({
          countComment: response.data.count,
          currentComment: response.data.rows
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    const {
      htmlString,
      relatedArticles,
      countComment,
      currentComment
    } = this.state;
    const { source, category, title } = htmlString;
    return (
      <div className="container-fluid">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-8 border">
              <h5 className="card-title mt-3">{title}</h5>
              <p className="card-text">{category ? category.name : ""}</p>
              <p className="card-text">
                {source ? (
                  <React.Fragment>
                    Theo <a href={source.href}>{source.name}</a>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </p>
              <p className="card-text">{htmlString.author}</p>
              <p className="card-text">
                {moment(htmlString.time).format("HH:mm DD-MM-YYYY")}
              </p>
              <div
                className="card-text"
                dangerouslySetInnerHTML={{ __html: htmlString.content }}
              />

              <div className="card-header text-center mt-3 border">
                <h5>Bình luận</h5>
              </div>
              <div className="card">
                {countComment === 0 ? (
                  <p className="text-center pt-2">Chưa có bình luận nào!</p>
                ) : (
                  currentComment.map(item => {
                    return (
                      <CommentComponent
                        key={item.id}
                        name={item.name}
                        email={item.email}
                        content={item.content}
                        avatar={`https://gravatar.com/avatar/${Math.floor(
                          Math.random() * 100
                        )}?d=identicon`}
                      />
                    );
                  })
                )}
              </div>

              <div className="card-header text-center mt-3 border">
                <h5>Để lại bình luận</h5>
              </div>
              <div className="card">
                <form className="card-body">
                  <div className="form-group">
                    <label>*Comment</label>
                    <textarea
                      onChange={this.handleCommentChange}
                      required
                      name="comment"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={this.state.comment}
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>*Name</label>
                      <input
                        onChange={this.handleNameChange}
                        required
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                      />
                    </div>
                    <div className="col">
                      <label>*Email</label>
                      <input
                        onChange={this.handleEmailChange}
                        required
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={this.state.email}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={this.onSubmitComment}
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
            <div className="col-sm-4">
              <CategoriesList />
              <h5 className="card-header mt-3">Tin liên quan</h5>
              {relatedArticles.map(item => (
                <RelatedArticles
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  thumb={item.thumb}
                  time={item.time}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(ArticleView);
