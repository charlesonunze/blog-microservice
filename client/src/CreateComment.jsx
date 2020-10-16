import React, { useState } from 'react';

const CreateComment = ({ postId, onCommentAdd }) => {
	const [text, updateText] = useState('');

	return (
		<div style={{ width: '300px' }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onCommentAdd(postId, { content: text });
					updateText('');
				}}
			>
				<div className='form-group'>
					<input
						type='text'
						id='comment'
						name='comment'
						value={text}
						className='form-control'
						aria-describedby='comment'
						placeholder='Add comment'
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

export default CreateComment;
