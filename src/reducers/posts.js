import { RECEIVE_POSTS, VOTE_POST, ADD_POST, REFRESH_POST } from '../actions/posts'

export default function posts(state={}, action) {
	switch (action.type) {
		case RECEIVE_POSTS:
			let newState = {}
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
			console.log(action)
			return {
				...state,
				[action.post.id] : action.post
			}

		default:
			return state
	}
}