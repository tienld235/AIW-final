import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/homepage";
import ArticleView from "./containers/articleView";
import CategoryView from "./containers/categoryView";
import TagsArticleView from "./containers/tagsArticleView";

// const browserHistory = ReactRouter.browserHistory;
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/article/:id" component={ArticleView} />
          <Route path="/categories/:id" component={CategoryView} />
          <Route path="/tags/:id/:name" component={TagsArticleView} />
        </Switch>
      </Router>
    );
  }
}

export default App;
