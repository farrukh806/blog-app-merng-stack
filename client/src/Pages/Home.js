import React, { useContext } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';

import PostForm from '../components/PostForm';
const Home = () => {
	const {
		loading,
		error,
		data: { getPosts: posts } = {},
	} = useQuery(FETCH_POSTS_QUERY);
	const context = useContext(AuthContext);

	return (
		<Grid stackable columns={3}>
			<Grid.Row className='page-title'>
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{context?.user && !error && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<Loader active />
				) : error ? (
					<h1>{error.message}</h1>
				) : (
					posts &&
					posts.map((post) => (
						<Grid.Column key={post.id}>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
};

const FETCH_POSTS_QUERY = gql`
	query {
		getPosts {
			id
			username
			body
			createdAt
			likes {
				username
				createdAt
			}
			comments {
				body
				id
				username
				createdAt
			}
		}
	}
`;
export { FETCH_POSTS_QUERY };
export default Home;
