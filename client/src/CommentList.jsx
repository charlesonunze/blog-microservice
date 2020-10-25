import React from 'react';

const CommentList = ({ comments }) => {
	return (
		<ul>
			{comments &&
				comments.map(({ content, status }, i) => {
					let comment;

					switch (status) {
						case 'pending':
							comment = 'This comment is awaiting moderation';
							break;

						case 'rejected':
							comment = 'This comment has been rejected';
							break;

						default:
							comment = content;
							break;
					}

					return (
						<li key={i} className='card-text'>
							{comment}
						</li>
					);
				})}
		</ul>
	);
};

export default CommentList;
