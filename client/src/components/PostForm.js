import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../Pages/Home';
const PostForm = () => {
	const [values, setValues] = useState({
		body: '',
	});

	const [error, setError] = useState(null);

	const onChangeHandler = (e) => {
		setValues({ [e.target.name]: e.target.value });
		setError(null);
	};
	const [createdPost] = useMutation(CREATE_POST, {
		variables: values,

		update(cache, { data: { createPost } }) {
			setValues({ body: '' });
			const fetchedData = cache.readQuery({ query: FETCH_POSTS_QUERY });

			cache.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getPosts: [createPost, ...fetchedData.getPosts] },
			});
		},
		onError(err) {
			setError(err.graphQLErrors[0].message);
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();
		createdPost();
	};
	return (
		<Form onSubmit={submitHandler} error>
			{error && <Message error content={error} />}
			<Form.Input
				label='Add a new post'
				placeholder='Write here...'
				type='text'
				name='body'
				value={values.body}
				onChange={onChangeHandler}
			/>

			<Button type='submit' color='teal'>
				Add Post
			</Button>
		</Form>
	);
};

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			comments {
				id
				body
				username
				createdAt
			}
		}
	}
`;

export default PostForm;
