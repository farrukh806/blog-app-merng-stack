import React, { useState, useContext, useRef } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import {
	Loader,
	Grid,
	Image,
	Card,
	Button,
	Icon,
	Label,
	Message,
	Form,
} from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth';

const Post = ({ match, history }) => {
	const [comment, setComment] = useState('');
	const [commentLoading, setCommentLoading] = useState(false);
	const commentInputRef = useRef(null);

	const { user } = useContext(AuthContext);

	const postId = match.params.id;
	const {
		loading,
		error,
		data: { getPost } = {},
	} = useQuery(FETCH_SINGLE_POST, {
		variables: { postId },
	});

	const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
		variables: { postId, body: comment },

		update() {
			setComment('');
			setCommentLoading(false);
			commentInputRef.current.blur();
		},
	});

	const submitCommentHandler = () => {
		setCommentLoading(true);
		submitComment();
	};
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
							{user && user.username && (
								<Card fluid>
									<Card.Content>
										<p>Post a comment</p>
										<Form>
											<div className='ui action input field'>
												<input
													type='text'
													placeholder='Write a comment..'
													name='comment'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
													ref={commentInputRef}
												/>
												<button
													type='submit'
													className='ui button teal'
													disabled={comment.trim() === ''}
													onClick={submitCommentHandler}>
													Submit
												</button>
											</div>
										</Form>
									</Card.Content>
								</Card>
							)}
							{commentLoading && <Loader active />}
							{getPost.comments.map((comment) => (
								<Card fluid key={comment.id}>
									<Card.Content>
										{user && user.username === comment.username && (
											<DeleteButton id={getPost.id} commentId={comment.id} />
										)}
										<Card.Header>{comment.username}</Card.Header>
										<Card.Meta>
											{moment(
												new Date(comment.createdAt).toDateString()
											).fromNow()}
										</Card.Meta>
										<Card.Description>{comment.body}</Card.Description>
									</Card.Content>
								</Card>
							))}
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

const CREATE_COMMENT_MUTATION = gql`
	mutation createComment($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				createdAt
				body
				username
			}
		}
	}
`;
export default Post;
