import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
	Loader,
	Grid,
	Image,
	Card,
	Button,
	Icon,
	Label,
	Message,
} from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

const Post = ({ match, history }) => {
	const postId = match.params.id;
	const {
		loading,
		error,
		data: { getPost } = {},
	} = useQuery(FETCH_SINGLE_POST, {
		variables: { postId },
	});
	console.log(error);
	const deletePostCallback = () => {
		history.push('/');
	};
	return (
		<>
			{loading ? (
				<Loader active />
			) : error ? (
				<Message error content={error.message} style={{ marginTop: '4em' }} />
			) : (
				<Grid>
					<Grid.Row>
						<Grid.Column width={2}>
							<Image
								size='small'
								src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
							/>
						</Grid.Column>
						<Grid.Column width={10}>
							<Card fluid>
								<Card.Content>
									<Card.Header>{getPost.username}</Card.Header>
									<Card.Meta>
										{moment(
											new Date(getPost.createdAt).toDateString()
										).fromNow()}
									</Card.Meta>
									<Card.Description>{getPost.body}</Card.Description>
								</Card.Content>
								<hr />
								<Card.Content extra>
									<LikeButton likes={getPost.likes} id={getPost.id} />
									<Button
										as='div'
										labelPosition='right'
										onClick={() => console.log('Comment')}>
										<Button basic color='blue'>
											<Icon name='comment' />
										</Button>
										<Label basic color='blue' pointing='left'>
											{getPost.comments.length}
										</Label>
									</Button>

									<DeleteButton
										username={getPost.username}
										id={getPost.id}
										callback={deletePostCallback}
									/>
								</Card.Content>
							</Card>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)}
		</>
	);
};

const FETCH_SINGLE_POST = gql`
	query getPost($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			likes {
				username
				createdAt
			}
			comments {
				id
				username
				createdAt
				body
			}
			username
			createdAt
		}
	}
`;
export default Post;
