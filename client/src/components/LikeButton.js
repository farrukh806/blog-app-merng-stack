import React, { useContext, useEffect, useState } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { gql, useMutation } from '@apollo/client';

const LikeButton = ({ likes, id }) => {
	const [liked, setLiked] = useState(false);
	const { user } = useContext(AuthContext);
	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});
	useEffect(() => {
		let idx;
		if (user) {
			idx = likes.findIndex((x) => x.username === user.username);
		}
		if (idx > -1) {
			setLiked(false);
		} else setLiked(!liked);
		// eslint-disable-next-line
	}, [likes, user]);

	return (
		<>
			<Button
				as='div'
				labelPosition='right'
				onClick={likePost}
				disabled={!user}>
				<Button color='red' basic={liked}>
					<Icon name='heart' />
				</Button>
				<Label basic color='red' pointing='left'>
					{likes.length}
				</Label>
			</Button>
		</>
	);
};

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
		}
	}
`;
export default LikeButton;
