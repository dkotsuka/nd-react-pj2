import { generateId } from '../utils/helpers'
import { getAllPosts, addNewPost } from '../utils/API'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
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

function addPost(post) {
	return {
		type: ADD_POST,
		post
	}
}

export function handleAddPost( title, body, author, category ) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
		return addNewPost({
			id: generateId(),
			timestamp: Date.now(),
			title,
			body,
			author: authedUser,
			category
		}).then((post) => dispatch(addPost(post)))
	}
}

function editPost(post) {
	return {
		type: EDIT_POST,
		post
	}
}

export function handleEditPost(id, title, body) {
	return editPost({
		id,
		title,
		body
	})
}