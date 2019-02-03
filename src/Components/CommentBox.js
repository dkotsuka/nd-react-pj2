import React, { Component } from 'react'
import { handleAddComment, handleEditComment } from '../actions/comments'
import { handleRefreshPost } from '../actions/posts'
import { connect } from 'react-redux'

class CommentBox extends Component {
	state = {
		username: "",
		body: ""
	}

	componentDidMount(){
		if(this.props.comment) {
			this.setState({
				username: this.props.comment.author,
				body: this.props.comment.body,
			})
		}
	}

	handleUsernameChange = (e) => {
		this.setState({username: e.target.value})
	}

	handleBodyChange = (e) => {
		this.setState({body: e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const body = this.state.body

		if(body.length > 0){
			if(this.props.comment){
				this.props.dispatch(handleEditComment(this.props.comment.id, this.state.body))
			} else {
				const username = this.state.username
				const comment = {
					parentId: this.props.id,
					author: username.length > 0 ? username : "anonymous",
					body
				}
				this.props.dispatch(handleAddComment(comment))
			}
			this.props.dispatch(handleRefreshPost(this.props.id))
			this.props.toggle()
		} else {
			alert("Please, comment something.")
		}

		
	}

	render() {
		return <div className='comment-box container'>
			<form onSubmit={this.handleSubmit}>
				<label>
					Username: 
					{!this.props.comment
					? <input type="text" value={this.state.username} 
						onChange={this.handleUsernameChange}
						placeholder="username"/>
					: <span>{this.state.username}</span>}
				</label>
				
				<textarea value={this.state.body} onChange={this.handleBodyChange}
					placeholder="Your comment here."/>
				<button className='red-button' type='submit'>Send</button>
			</form>
		</div>
	}
}

function mapStateToProps({comments}, {comment, id}) {
	const item = comments[id][comment]
	console.log(item)
	return {
		comment: item
	}
}

export default connect(mapStateToProps)(CommentBox)