import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/posts'
import Post from './Post'
import Nav from './Nav'
import CommentList from './CommentList'
import CommentBox from './CommentBox'
import Page404 from './Page404'

class PostDetails extends Component {

	constructor(props){
		super(props)
		this.state = {
			comment: null,
			commentBox: false
		}
	}

	toggleCommentBox = () => {
		if (this.state.commentBox) {
			this.setState({ commentBox: false })
		} else {
			this.setState({ comment : null, commentBox: true })
		}
	}

	setComment = (id) => {
		this.setState({comment : id, commentBox: true})
	}

	onClickDelete = (id) => {
		this.props.dispatch(handleDeletePost(id))
		window.history.back()
	}

	render () {
		const { id } = this.props.match.params
		return <div>
			<Nav />
			{this.props.post 
				? <div>
					<div className='edit-post container'>
						<NavLink to={`/edit/${id}`} className='red-button'>
							Edit Post
						</NavLink>
						<button className='red-button' onClick={() => this.onClickDelete(id)}>
							Delete Post
						</button>
					</div>
					<Post id={id}/>
					<div className='component container'>
						<h3>Comments:</h3>
						<button className='red-button' onClick={this.toggleCommentBox}>
							{this.state.commentBox ? "Cancel" : "Comment this post"}
						</button>
					</div>
					{this.state.commentBox 
						? <CommentBox id={id} comment={this.state.comment} toggle={this.toggleCommentBox}/> 
						: <CommentList id={id} editComment={this.setComment}/>}
				</div>
				: <Page404 />}
		</div>
	}
}

function mapStateToProps({ posts }, props) {
	const { id } = props.match.params
	const post = posts[id]

	return {post}
}

export default withRouter(connect(mapStateToProps)(PostDetails))