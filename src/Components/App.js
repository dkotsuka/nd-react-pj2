import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { getInitialPosts } from '../actions/posts'
import { getAllCategories } from '../actions/categories'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostList from './PostList'
import EditPostView from './EditPostView'
import PostDetails from './PostDetails'
import Page404 from './Page404'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategories())
    this.props.dispatch(getInitialPosts())
  }

  render() {
    return (
      <Router >
        <div className="App">
          <Switch>
            <Route path='/' exact component={PostList} />
            <Route path='/404' exact component={Page404} />
            <Route path='/new' exact component={EditPostView} />
            <Route path='/edit/:id' exact component={EditPostView} />
            <Route path='/:category' exact component={PostList} />
            <Route path='/:category/:id' exact component={PostDetails} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect()(App)
