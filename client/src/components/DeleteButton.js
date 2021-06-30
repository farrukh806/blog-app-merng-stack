import React, { useContext, useState } from 'react';
import { Button, Message, Confirm } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { gql, useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../Pages/Home';

const DeleteButton = ({ username, id, callback }) => {
	const [error, setError] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const context = useContext(AuthContext);

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		variables: { postId: id },
		update(cache, _) {
			setConfirmOpen(false);
			const fetchedData = cache.readQuery({ query: FETCH_POSTS_QUERY });
			const filteredData = fetchedData.getPosts.filter(
				(post) => post.id !== id
			);
			cache.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getPosts: [...filteredData] },
			});
			console.log(cache.data);

			if (callback) callback();
		},
		onError(err) {
			setError(err.message);
		},
	});
	return (
		<>
			{error && <Message error content={error} />}
			{context.user && context.user.username === username && (
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
						onConfirm={deletePost}
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

export default DeleteButton;
