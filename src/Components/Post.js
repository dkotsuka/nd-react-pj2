import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import { withRouter } from 'react-router-dom'
import { FaComment, FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { IconContext } from "react-icons"
import { handleVotePost } from "../actions/posts"
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Post extends Component {
	render (){
		const { post, dispatch } = this.props
		return <li className='post'>
			<div className='post-container'>
				<div className='votes-container'>
					<IconContext.Provider value={{ color: '#FFF', size: '1rem' }}>
						<button onClick={() => dispatch(handleVotePost(post.id, "upVote"))}>
							<FaAngleUp />
						</button>
						<p>{post.voteScore}</p>
						<button onClick={() => dispatch(handleVotePost(post.id, "downVote"))}>
							<FaAngleDown />
						</button>
					</IconContext.Provider>
				</div>
				<NavLink to={`/${post.category}/${post.id}`} exact>
					<div className='post-content'>
						<h2><span>{post.category}</span>{post.title}</h2>
						<div>
							<span>by {post.author}</span>
							<span> at {formatDate(post.timestamp)}</span>
						</div>
						<p>
							{post.body}
						</p>
						<div className='comment-count'>
							<IconContext.Provider value={{ color: '#888', size: '1rem' }}>
								<FaComment />
							</IconContext.Provider>
							<span>{post.commentCount}</span>
						</div>
					</div>
				</NavLink>
			</div>
		</li>
	}
}
function mapStateToProps({ posts }, {id}) {	
	const post = posts[id]
	if(post){
		return { post }
	}
	return { post: {} }
}

export default withRouter(connect(mapStateToProps)(Post))