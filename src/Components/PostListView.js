import React from 'react'
import PostList from './PostList'
import Nav from './Nav'

function PostListView (props){
	return <div>
		<Nav />
		<PostList />
	</div>
}

export default PostListView