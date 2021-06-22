import User from '../../models/User.js';
import Post from '../../models/Post.js';

const postsResolvers = {
	Query: {
		getPosts: async () => {
			try {
				const posts = await Post.find({});
				return posts;
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		},
	},
};

export default postsResolvers;
