const baseURL='http://localhost:3001'
const headers = { 'Authorization': 'whatever-you-want' }


export const getCategories = () =>
	fetch( `${baseURL}/categories`, { headers })
		.then(res => res.json())

export const getCategoryPosts = (category) =>
	fetch( `${baseURL}/${category}/posts`, { headers } )
		.then(res => res.json())

export const getAllPosts = () =>
	fetch( `${baseURL}/posts`, { headers } )
		.then(res => res.json())

export const getPost = (id) =>
	fetch( `${baseURL}/posts/${id}`, { headers } )
		.then(res => res.json())

export const getAllPostComments = (postId) =>
	fetch( `${baseURL}/posts/${postId}/comments`, { headers } )
		.then(res => res.json())

export const getComment = (commentId) =>
	fetch( `${baseURL}/comments/${commentId}`, { headers } )
		.then(res => res.json())


export const addNewPost = (post) => 
	fetch(`${baseURL}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const votePost = (postId, value) => 
	fetch(`${baseURL}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: value})
  }).then(res => res.json())

export const editPost = (post) =>
  fetch(`${baseURL}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  }).then(res => res.json())

export const deletePost = (postId) =>
	fetch(`${baseURL}/posts/${postId}`, {
		method: 'DELETE',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())