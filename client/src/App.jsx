import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreatePost from './CreatePost';
import PostList from './PostList';

function App() {
	const [posts, updatePosts] = useState([]);

	const fetctPosts = async () => {
		const { data } = await axios.get('http://localhost:4002/posts/');
		updatePosts(Object.values(data));
	};

	useEffect(() => {
		fetctPosts();
	}, []);

	const addPostHandler = async (title) => {
		const _posts = [...posts];

		const { data: _post } = await axios.post('http://localhost:4000/posts/', {
			title
		});

		_posts.unshift(_post);
		updatePosts(_posts);
	};

	const addCommentHandler = async (postId, comment) => {
		const _posts = [...posts];
		const index = _posts.findIndex((post) => post.id === postId);

		const { data: comments } = await axios.post(
			`http://localhost:4001/posts/${postId}/comments/`,
			comment
		);

		_posts[index].comments = comments;
		updatePosts(_posts);
	};

	return (
		<div className='container' style={{ padding: '30px' }}>
			<CreatePost onPostAdd={addPostHandler} />
			<hr />
			<PostList posts={posts} onCommentAdd={addCommentHandler} />
		</div>
	);
}

export default App;
