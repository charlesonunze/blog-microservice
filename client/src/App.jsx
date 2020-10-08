import React from 'react';

import CreatePost from './CreatePost';
import PostList from './PostList';

function App() {
	return (
		<div className='container' style={{ padding: '30px' }}>
			<CreatePost />
			<hr />
			<PostList />
		</div>
	);
}

export default App;
