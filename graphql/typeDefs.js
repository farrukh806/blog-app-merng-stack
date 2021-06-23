import gql from 'graphql-tag';

const typeDefs = gql`
	type Post {
		id: ID!
		body: String!
		username: String!
		createdAt: String
		comments: [Comment]!
		likes: [Like]!
	}
	type Comment {
		id: ID!
		createdAt: String
		body: String!
		username: String!
	}
	type Like {
		id: ID!
		createdAt: String
		username: String!
	}
	type User {
		id: ID!
		email: String!
		username: String!
		token: String!
		createdAt: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
	}

	type Mutation {
		register(registerInput: RegisterInput): User
		login(username: String!, password: String!): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commentId: ID!): Post!
		likePost(postId: ID!): Post!
	}
`;

export default typeDefs;
