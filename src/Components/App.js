import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { getInitialPosts } from '../actions/posts'
import { getAllCategories } from '../actions/categories'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllCategories())
    this.props.dispatch(getInitialPosts())
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        App
      </div>
    )
  }
}

export default connect()(App)
