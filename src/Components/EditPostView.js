import React, { Component } from "react"
import Nav from "./Nav"
import { connect } from "react-redux"
import { handleAddPost, handleEditPost } from "../actions/posts"
import { withRouter } from 'react-router-dom'

class EditPostView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			author: "",
			title: "",
			body: "",
			category: "react"
		}
	}

	componentDidMount() {
		if(this.props.post){
			const {title, body, author, category} = this.props.post
			this.setState({author, title, body, category})		
		}
	}

	onTitleChange = (e) => {
		const title = e.target.value
		this.setState({title})
	}

	onBodyChange = (e) => {
		const body = e.target.value
		this.setState({body})
	}

	onCategoryChange = (e) => {
		const category = e.target.value
		this.setState({category})
	}

	onChangeAuthor = (e) => {
		const author = e.target.value
		this.setState({author})
	}

	onSubmit = (e) => {
		e.preventDefault()
		const {author, title, body, category} = this.state
		if ( title.length > 0 && body.length > 0 ) {
			if(!this.props.post){
				const post = {
					author: author === "" ? "anonymous" : author,
					title,
					body,
					category
				}
				this.props.dispatch(handleAddPost(post))
			} else {
				const id = this.props.post.id
				const {title, body} = this.state
				this.props.dispatch(handleEditPost(id, title, body))
			}
			window.history.back()
		} else {
			alert("Your post must have a title and a body text.")
		}

		
	}

	render() {
		const { categories } = this.props
		return <div className="new-post-view">
			<Nav />
			<div className="input-container container">
				<form onSubmit={this.onSubmit}>
					<div>
						<label>
						Author: 
						{this.props.post 
							? <span>{this.props.post.author}</span> 
							: <input type="text" value={this.state.author} 
							onChange={this.onChangeAuthor}
							placeholder="User name"/>}
						</label>
						<label>
							Category:
							<select value={this.state.category}
								onChange={this.onCategoryChange}>
								{categories.map((category)=> 
									<option key={category}>{category}</option>
								)}
							</select>
						</label>
					</div>
					<input type="text" value={this.state.title} placeholder="Title" 
						onChange={this.onTitleChange}/>

					<textarea type="text" value={this.state.body} placeholder="Write your text here."
						onChange={this.onBodyChange}/>

					<input type="submit" value="Submit" />
				</form>
			</div>
		</div>
	}
}

function mapStateToProps({ categories, posts }, props) {
	const { id } = props.match.params
	const categorylist = []
	const post = posts[id]

	for (let key in categories) {
		categorylist.push(categories[key].name)
	}

	return { post, categories: categorylist }
}

export default withRouter(connect(mapStateToProps)(EditPostView))