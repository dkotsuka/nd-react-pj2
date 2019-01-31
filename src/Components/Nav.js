import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function Nav(props) {
	const path = props.location.pathname
	let pageName
	if (path.includes("/newpost")) {
		pageName = "New post"
	} else if (path.includes("/post/")) {
		pageName = "Post details"
	}
	return <div className='navbar'>
		<nav>
			<NavLink to='/' exact><h1>Readit!</h1></NavLink>

			<ul>
				{props.categories.map((category) => (
					<NavLink to={`/category/${category.path}`} 
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