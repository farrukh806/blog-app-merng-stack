import gql from 'graphql-tag';

import { GraphQLScalarType, Kind } from 'graphql';

const date = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value) {
		return value.getTime(); // Convert outgoing Date to integer for JSON
	},
	parseValue(value) {
		return new Date(value); // Convert incoming integer to Date
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
		}
		return null; // Invalid hard-coded value (not an integer)
	},
});

const typeDefs = gql`
	scalar Date
	type Post {
		id: ID!
		body: String!
		username: String!
		createdAt: Date!
		comments: [Comment]!
		likes: [Like]!
	}
	type Comment {
		id: ID!
		createdAt: Date!
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
		createdAt: Date!
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
