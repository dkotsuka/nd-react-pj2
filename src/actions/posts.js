import { generateId } from '../utils/helpers'
import { getAllPosts, addNewPost, votePost, getPost, removePost, modifyPost } from '../utils/API'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const REFRESH_POST = 'REFRESH_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'


function receivePosts(posts) {
	return {
		type: RECEIVE_POSTS,
		posts
	}
}

export function getInitialPosts(argument) {
	return (dispatch) => {
		return getAllPosts()
		.then((res) => {
			dispatch(receivePosts(res))
		})
	}
}

function refreshPost(post) {
	return {
		type: REFRESH_POST,
		post
	}
}

export function handleRefreshPost(id) {
	return (dispatch) => {
		return getPost(id)
		.then((res) => {
			dispatch(refreshPost(res))
		})
	}
}

function addPost(post) {
	return {
		type: ADD_POST,
		post
	}
}

export function handleAddPost( post ) {
	return (dispatch) => {
		return addNewPost({
			id: generateId(),
			timestamp: Date.now(),
			title: post.title,
			body: post.body,
			author: post.author,
			category: post.category
		}).then((post) => dispatch(addPost(post)))
	}
}
function countVotePost(id, value) {
	return {
		type: VOTE_POST,
		id,
		value
	}
}

export function handleVotePost(postID, value) {
	return (dispatch) => {
		return votePost( postID, value )
			.then((res) => dispatch(countVotePost(res.id, res.voteScore)))
	}
}

function editPost(post) {
	return {
		type: EDIT_POST,
		post
	}
}

export function handleEditPost(id, title, body) {
	return (dispatch) => {
		return modifyPost({
			id,
			title,
			body
		}).then((res) => dispatch(editPost(res)))
	}
}

function deletePost({id}) {
	return {
		type: DELETE_POST,
		id
	}
}

export function handleDeletePost(id) {
	return (dispatch) => {
		return removePost(id)
		.then((res) => dispatch(deletePost(res)))
	}
}