import { RECEIVE_POSTS, 
	VOTE_POST, ADD_POST, 
	REFRESH_POST,
	DELETE_POST,
	EDIT_POST } from '../actions/posts'

export default function posts(state={}, action) {
	let newState = {}
	switch (action.type) {
		case RECEIVE_POSTS:
			for (let key in action.posts) {
				newState = Object.assign(newState, {[action.posts[key].id]: action.posts[key]})
			}
			return {
				...state,
				...newState
			}

		case ADD_POST: 
			return Object.assign({}, state, {[action.post.id]: action.post} )

		case VOTE_POST:
			return {
				...state,
				[action.id] : {
					...state[action.id],
					voteScore: action.value
				}
			}

		case REFRESH_POST:
			return {
				...state,
				[action.post.id] : action.post
			}

		case DELETE_POST:
			newState = Object.assign({}, state)
			delete newState[action.id]
			return newState

		case EDIT_POST:
			newState = Object.assign({}, state, {
				[action.post.id]: {
					...action.post
				}
			})
			return newState
		default:
			return state
	}
}