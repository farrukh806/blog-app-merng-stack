import React from 'react';
import { useQuery, gql } from '@apollo/client';
const Home = () => {
	const {
		loading,
		error,
		data: { getPosts: posts },
	} = useQuery(FETCH_POSTS_QUERY);

	
	console.log(posts);
	return <div>Home</div>;
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
export default Home;
