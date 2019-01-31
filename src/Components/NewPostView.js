import React, { Component } from "react"
import Nav from "./Nav"
import { connect } from "react-redux"
import { handleAddPost } from "../actions/posts"

class NewPostView extends Component {
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
		if(this.props.id){
			const { title, body } = this.props.post
			this.setState({title, body})
		}
	}

	handleTitleChange = (e) => {
		const title = e.target.value
		this.setState({title})
	}

	handleBodyChange = (e) => {
		const body = e.target.value
		this.setState({body})
	}

	handleCategoryChange = (e) => {
		const category = e.target.value
		this.setState({category})
	}

	handleChangeAuthor = (e) => {
		const author = e.target.value
		this.setState({author})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const {author, title, body, category} = this.state
		if ( title.length > 0 && body.length > 0 ) {
			const post = {
				author: author === "" ? "anonymous" : author,
				title,
				body,
				category
			}
			this.props.dispatch(handleAddPost(post))
			window.history.back()
		} else {
			alert("Your post must have a title and a body text.")
		}

		
	}

	render() {
		const { categories } = this.props
		return <div className="new-post-view">
			<Nav />
			<div className="input-container">
				<form onSubmit={this.handleSubmit}>
					<div>
						<input type="text" value={this.state.author} 
							onChange={this.handleChangeAuthor}
							placeholder="User name"/>
						<label>
							Category:
							<select value={this.state.category}
								onChange={this.handleCategoryChange}>
								{categories.map((category)=> 
									<option key={category}>{category}</option>
								)}
							</select>
						</label>
					</div>
					<input type="text" value={this.state.title} placeholder="Title" 
						onChange={this.handleTitleChange}/>

					<textarea type="text" value={this.state.body} placeholder="Write your text here."
						onChange={this.handleBodyChange}/>

					<input type="submit" value="Submit" />
				</form>
			</div>
		</div>
	}
}

function mapStateToProps({ categories, posts }, {id}) {
	let post = {}
	const categorylist = []
	for (let key in posts) {
		if (posts[key].id === id){
			post = posts[key]
		}
	}
	for (let key in categories) {
		categorylist.push(categories[key].name)
	}

	return { post, categories: categorylist }
}

export default connect(mapStateToProps)(NewPostView)