import { ApolloServer } from 'apollo-server';

import connectDB from './config/db.js';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});
connectDB();
server
	.listen({ port: 5000 })
	.then((res) => console.log(`Server running at ${res.url}`))
	.catch((error) => console.log(error));
