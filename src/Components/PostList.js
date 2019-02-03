import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import Nav from './Nav'

class PostList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			order: "mostVoted"
		}
	}

	filterPosts() {
		let { posts } = this.props
		const category = this.props.match.params.category

		if (category) {
			posts = posts.filter((post) => post.category === category)
		}
		return posts
	}

	handleOrderChange = (e, posts) => {
		const order = e.target.value
		this.setState({order: order})
	}

	orderPosts(posts) {
		if(this.state.order === "mostVoted"){
			posts.sort((a,b) => b.voteScore - a.voteScore)
		} else if (this.state.order === "newFirst") {
			posts.sort((a,b) => b.timestamp - a.timestamp)
		}
	}

	render() {
		const posts = this.filterPosts()
		this.orderPosts(posts)
		
		return <div>
			<Nav />
			<div className='selector-container container'>
				<NavLink to='/new' exact><span>+ New Post</span></NavLink>
				<div>
					<span id="order">Order by: </span>
					<select value={this.state.order} 
						onChange={(e) => this.handleOrderChange(e, posts)}
						label="order">
						<option value="mostVoted">most voted</option>
						<option value="newFirst">newest first</option>
					</select>
				</div>
			</div>
			{(posts.length > 0 ? (
				<ul className='post-list'>
					{ posts.map((post) => 
						<Post key={post.id} id={post.id}/>
					)}
				</ul>
			):(
				<div className='empty-box container'><p>Humm... There's nothing to show here...</p></div>
			))}
		</div>
	}
}

function mapStateToProps({posts}){
	const list = []
	for (let key in posts) {
		list.push(posts[key])
	}

	return { posts: list }
}

export default withRouter(connect(mapStateToProps)(PostList))