import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreatePost from './CreatePost';
import PostList from './PostList';

function App() {
	const [posts, updatePosts] = useState([]);

	const fetctPosts = async () => {
		const { data } = await axios.get('http://localhost:4000/posts/');
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

	return (
		<div className='container' style={{ padding: '30px' }}>
			<CreatePost onPostAdd={addPostHandler} />
			<hr />
			<PostList />
		</div>
	);
}

export default App;
