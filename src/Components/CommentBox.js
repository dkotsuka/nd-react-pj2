import React, { Component } from 'react'
import { handleAddComment } from '../actions/comments'
import { handleRefreshPost } from '../actions/posts'
import { connect } from 'react-redux'

class CommentBox extends Component {
	state = {
		username: "",
		body: ""
	}

	handleUsernameChange = (e) => {
		this.setState({username: e.target.value})
	}

	handleBodyChange = (e) => {
		this.setState({body: e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const comment = {
			parentId: this.props.id,
			author: this.state.username,
			body: this.state.body
		}
		this.props.dispatch(handleAddComment(comment))
		this.props.dispatch(handleRefreshPost(this.props.id))
		this.props.toggle()
	}

	render() {
		return <div className='comment-box'>
			<form onSubmit={this.handleSubmit}>
				<label>
					Username: 
					<input type="text" value={this.state.username} 
						onChange={this.handleUsernameChange}
						placeholder="username"/>
				</label>
				
				<textarea value={this.state.body} onChange={this.handleBodyChange}
					placeholder="Your comment here."/>
				<button className='red-button' type='submit'>Send</button>
			</form>
		</div>
	}
}

export default connect()(CommentBox)