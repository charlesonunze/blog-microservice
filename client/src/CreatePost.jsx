import React, { useState } from 'react';

const CreatePost = ({ onPostAdd }) => {
	const [text, updateText] = useState('');

	return (
		<div style={{ width: '300px' }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onPostAdd(text);
					updateText('');
				}}
			>
				<div className='form-group'>
					<label htmlFor='title'>Post Title</label>
					<input
						type='text'
						id='title'
						name='title'
						value={text}
						className='form-control'
						aria-describedby='title'
						placeholder='Enter post title'
						onChange={(e) => updateText(e.target.value)}
					/>
				</div>

				<button
					type='submit'
					className='btn btn-primary'
					disabled={text.length < 1}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
