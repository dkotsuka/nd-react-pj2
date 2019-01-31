import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { getInitialPosts } from '../actions/posts'
import { getAllCategories } from '../actions/categories'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PostListView from './PostListView'
import NewPostView from './NewPostView'
import PostDetails from './PostDetails'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategories())
    this.props.dispatch(getInitialPosts())
  }

  render() {
    return (
      <Router >
        <div className="App">
          <Route path='/' exact component={PostListView} />
          <Route path='/category' component={PostListView} />
          <Route path='/post/:id' component={PostDetails} />
          <Route path='/newpost' component={NewPostView} />
        </div>
      </Router>
    )
  }
}

export default connect()(App)
