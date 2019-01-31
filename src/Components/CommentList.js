import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments, handleVoteComment } from '../actions/comments'
import { formatDate } from '../utils/helpers'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { IconContext } from "react-icons"

class CommentList extends Component {

	componentDidMount() {
		if(!this.props.comments.length > 0){
			this.props.dispatch(getComments(this.props.id))
		}
	}

	render() {
		let comments = this.props.comments
		if(!comments) {
			comments = []
		}
		return <ul>
 			{	comments.length > 0
 				? comments.map((comment) => (
	 				<li key={comment.id} className='comment-container'>
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
	 					<div className='content'>
		 					<span>by {comment.author} at {formatDate(comment.timestamp)}</span>
		 					<p>{comment.body}</p>
	 					</div>
	 				</li>
	 			)) : ( 
	 				<li className='comment-container empty'>No comments yet.</li>
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