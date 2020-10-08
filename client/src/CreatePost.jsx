import React from 'react';

const CreatePost = () => (
	<div style={{ width: '300px' }}>
		<form>
			<div className='form-group'>
				<label htmlFor='title'>Post Title</label>
				<input
					type='text'
					id='title'
					name='title'
					className='form-control'
					aria-describedby='title'
					placeholder='Enter title'
				/>
			</div>

			<button type='submit' className='btn btn-primary'>
				Submit
			</button>
		</form>
	</div>
);

export default CreatePost;
