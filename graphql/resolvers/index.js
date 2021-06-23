import postResolvers from './posts.js';
import userResolvers from './users.js';
import commentResolvers from './comment.js';

const resolvers = {
	Query: {
		...postResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...commentResolvers.Mutation,
	},
};
export default resolvers;
