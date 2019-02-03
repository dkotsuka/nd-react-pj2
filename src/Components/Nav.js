import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function Nav(props) {

	const { params } = props.match
	const path = props.location.pathname
	let pageName

	if (path.includes("/new")) {
		pageName = "New post"
	} else if (params.category && params.id) {
		pageName = "Post details"
	} else if(path.includes("/edit/")) {
		pageName = "Edit post"
	}

	return <div className='navbar'>
		<nav>
			<NavLink to='/' exact><h1>Readit!</h1></NavLink>

			<ul>
				{props.categories.map((category) => (
					<NavLink to={`/${category.path}`} 
						exact activeClassName='active'
						className={`${pageName ? "hidden" : ""}`}
						key={category.name}>
						<li>{category.name}</li>
					</NavLink>
				))}
				<li className={`page-name ${!pageName ? "hidden" : ""}`}>{pageName}</li>
			</ul>
		</nav>
	</div>
}

function mapStateToProps({ categories }) {
	const list = []
	for (let key in categories) {
		list.push(categories[key])
	}
	return { categories: list }
}

export default withRouter(connect(mapStateToProps)(Nav))