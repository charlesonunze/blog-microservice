import React from 'react';

const Post = () => (
	<div className='card col-sm' style={{ width: '18rem' }}>
		<div className='card-body'>
			<h4 className='card-title'>Card title</h4>
			<hr />

			<h5 className='card-subtitle mb-2 text-muted'>Comments:</h5>

			<ul>
				<li className='card-text'>Comment one</li>
				<li className='card-text'>Comment one</li>
			</ul>

			<form>
				<div className='form-group'>
					<input
						type='text'
						id='comment'
						name='comment'
						className='form-control'
						aria-describedby='comment'
						placeholder='Enter comment'
					/>
				</div>

				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	</div>
);

const PostList = () => {
	return (
		<>
			<h1>PostList</h1>

			<div className='row'>
				{[1, 2, 3].map((_, i) => (
					<Post key={i} />
				))}
			</div>
		</>
	);
};

export default PostList;
