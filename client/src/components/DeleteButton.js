import React, { useState } from 'react';
import { Button, Message, Confirm } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../Pages/Home';

const DeleteButton = ({ id, callback, commentId }) => {
	const [error, setError] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
	const [deletePostOrMutation] = useMutation(mutation, {
		variables: { postId: id, commentId },
		update(cache, _) {
			setConfirmOpen(false);
			if (!commentId) {
				const fetchedData = cache.readQuery({ query: FETCH_POSTS_QUERY });
				const filteredData = fetchedData.getPosts.filter(
					(post) => post.id !== id
				);
				cache.writeQuery({
					query: FETCH_POSTS_QUERY,
					data: { getPosts: [...filteredData] },
				});
			}

			if (callback) callback();
		},
		onError(err) {
			setError(err.message);
		},
	});
	return (
		<>
			{error ? (
				<Message error content={error} />
			) : (
				<>
					<Button
						as='div'
						icon='trash'
						color='red'
						floated='right'
						onClick={() => setConfirmOpen(true)}></Button>
					<Confirm
						open={confirmOpen}
						onCancel={() => setConfirmOpen(false)}
						onConfirm={deletePostOrMutation}
					/>
				</>
			)}
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

export default DeleteButton;
