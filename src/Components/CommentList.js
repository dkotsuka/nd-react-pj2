import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments, handleVoteComment, handleDeleteComment } from '../actions/comments'
import { handleRefreshPost } from '../actions/posts'
import { formatDate } from '../utils/helpers'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { IconContext } from "react-icons"

class CommentList extends Component {

	componentDidMount() {
		if(!this.props.comments.length > 0){
			this.props.dispatch(getComments(this.props.id))
		}
	}

	onDeleteComment(id) {
		this.props.dispatch(handleDeleteComment(id))
		this.props.dispatch(handleRefreshPost(this.props.id))
	}

	render() {
		const { comments } = this.props
		return <ul>
 			{	comments.length > 0
 				? comments.map((comment) => (
	 				<li key={comment.id} className='comment-container container'>
	 					<div className='vote-score'>
		 					<IconContext.Provider value={{ color: '#FFF', size: '1rem' }}>
								<button onClick={() => this.props.dispatch(handleVoteComment(comment.id, "upVote"))}>
									<FaAngleUp />
								</button>
								<p>{comment.voteScore}</p>
								<button onClick={() => this.props.dispatch(handleVoteComment(comment.id, "downVote"))}>
									<FaAngleDown />
								</button>
							</IconContext.Provider>
	 					</div>
	 					<div className='content container'>
		 					<span>by {comment.author} at {formatDate(comment.timestamp)}</span>
		 					<p>{comment.body}</p>
		 					<div className='button-container'>
		 						<button className='red-button'
		 							onClick={() => this.props.editComment(comment.id)}>
		 							Edit
		 						</button>
		 						<button className='red-button'
		 							onClick={() => this.onDeleteComment(comment.id)}>
		 							Delete
		 						</button>
		 					</div>
		 					
	 					</div>
	 				</li>
	 			)) : ( 
	 				<li className='comment-container empty container'>No comments yet.</li>
	 			)
 			}
 		</ul>
	}
}

function mapStateToProps({ comments }, {id}) {
	const list = []
	for (let key in comments[id]) {
		list.push(comments[id][key])
	}
	list.sort((a,b) => b.voteScore - a.voteScore)
	return {comments: list}
}

export default connect(mapStateToProps)(CommentList)