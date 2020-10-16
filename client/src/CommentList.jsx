import React from 'react';

const CommentList = ({ comments }) => {
	return (
		<ul>
			{comments &&
				comments.map(({ content }, i) => (
					<li key={i} className='card-text'>
						{content}
					</li>
				))}
		</ul>
	);
};

export default CommentList;
