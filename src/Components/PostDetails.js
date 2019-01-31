import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Post from './Post'
import Nav from './Nav'
import CommentList from './CommentList'
import CommentBox from './CommentBox'

class PostDetails extends Component {

	constructor(props){
		super(props)
		this.state = {
			commentBox: false
		}
	}

	toggleCommentBox = () => {
		if (this.state.commentBox) {
			this.setState({ commentBox: false })
		} else {
			this.setState({ commentBox: true })
		}
	}

	render () {
		const id = this.props.location.pathname.replace("/post/", "")
		return <div>
			<Nav />
			<Post id={id}/>
			<div className='component'>
				<h3>Comments:</h3>
				<button className='red-button' onClick={this.toggleCommentBox}>
					{this.state.commentBox ? "Cancel" : "Comment this post"}
				</button>
			</div>
			{this.state.commentBox ? <CommentBox id={id} toggle={this.toggleCommentBox}/> : <CommentList id={id}/>}
		</div>
	}
}



export default withRouter(PostDetails)