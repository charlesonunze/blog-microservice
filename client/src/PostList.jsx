import React from 'react';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const Post = ({ post, onCommentAdd }) => {
	const { id, title, comments } = post;

	return (
		<div className='card col-sm-6' style={{ width: '18rem' }}>
			<div className='card-body'>
				<h4 className='card-title'>{title}</h4>
				<hr />

				<h5 className='card-subtitle mb-2 text-muted'>Comments:</h5>

				<CommentList comments={comments} />
				<CreateComment postId={id} onCommentAdd={onCommentAdd} />
			</div>
		</div>
	);
};

const PostList = ({ posts, onCommentAdd }) => {
	return (
		<>
			<h1>Post Lists</h1>

			<div className='row'>
				{posts.map((post, i) => (
					<Post key={i} post={post} onCommentAdd={onCommentAdd} />
				))}
			</div>
		</>
	);
};

export default PostList;
