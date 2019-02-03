import { generateId } from '../utils/helpers'
import { getAllPostComments, 
	voteComment as vote, 
	addNewComment,
	removeComment,
	modifyComment } from '../utils/API'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

function receiveComments(comments, postId) {
	return {
		type: RECEIVE_COMMENTS,
		comments,
		post: postId
	}
}

export function getComments(postId) {
	return (dispatch) => {
		return getAllPostComments(postId)
		.then((res) => {
			dispatch(receiveComments(res, postId))
		})
	}
}

function voteComment({id, parentId, voteScore}) {
	return {
		type: VOTE_COMMENT,
		id,
		parentId,
		voteScore
	}
}

export function handleVoteComment(id, value) {
	console.log(id)
	return (dispatch) => {
		return vote(id, value)
		.then((res) => {
			dispatch(voteComment(res))
		})
	}
}

function addComment(comment) {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export function handleAddComment( comment ) {
	return (dispatch, getState) => {
		return addNewComment({
			id: generateId(),
			timestamp: Date.now(),
			body: comment.body,
			author: comment.author,
			parentId: comment.parentId
		}).then((res) => dispatch(addComment(res)))
	}
}

function deleteComment({id, parentId}) {
	return {
		type: DELETE_COMMENT,
		id,
		parentId
	}
}

export function handleDeleteComment(id) {
	return (dispatch) => {
		return removeComment(id)
		.then((res) => dispatch(deleteComment(res)))
	}
}

function editComment(comment) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}

export function handleEditComment(id, body) {
	return (dispatch) => {
		return modifyComment(id, {
			timestamp: Date.now(),
			body
		}).then((res) => dispatch(editComment(res)))
	}
}