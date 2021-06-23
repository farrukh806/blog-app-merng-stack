import User from '../../models/User.js';
import Post from '../../models/Post.js';
import checkAuth from '../../utils/auth.js';

const postsResolvers = {
	Query: {
		getPosts: async () => {
			try {
				const posts = await Post.find({}).sort({ createdAt: 'desc' });
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},

		getPost: async (_, { postId }) => {
			try {
				const post = await Post.findById(postId);
				if (post) return post;
				else throw new Error(`Post not found`);
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		},
	},
	Mutation: {
		createPost: async (_, { body }, context) => {
			const user = checkAuth(context);
			const newPost = new Post({
				body,
				username: user.username,
				user: user.id,
			});
			const createdPost = await newPost.save();
			return createdPost;
		},
	},
};

export default postsResolvers;
