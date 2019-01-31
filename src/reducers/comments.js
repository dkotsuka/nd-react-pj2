import { RECEIVE_COMMENTS, VOTE_COMMENT, ADD_COMMENT } from '../actions/comments'

export default function comments(state={}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS:
			let newState = {}
			action.comments.map((comment) => 
				newState = Object.assign(newState, {[comment.id]: comment})
			)

			return {
				...state,
				[action.post] : newState

			}

		case VOTE_COMMENT:

			return {
				...state,
				[action.parentId] : {
					...state[action.parentId],
					[action.id] : {
						...state[action.parentId][action.id],
						voteScore: action.voteScore
					}
				}
			}

		case ADD_COMMENT:

			return {
				...state,
				[action.comment.parentId] : {
					...state[action.comment.parentId],
					[action.comment.id] : {
						...action.comment,

					}
				}
			}

		default:
			return state
	}
}