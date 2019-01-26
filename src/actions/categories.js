import { getCategories } from '../utils/API'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function receiveCategories(categories) {
	return {
		type: RECEIVE_CATEGORIES,
		...categories
	}
}

export function getAllCategories() {
	return (dispatch) => {
		return getCategories()
		.then((categories) => {
			dispatch(receiveCategories(categories))
		})
	}
}