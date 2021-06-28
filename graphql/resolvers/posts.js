import User from '../../models/User.js';
import Post from '../../models/Post.js';
import checkAuth from '../../utils/auth.js';
import { AuthenticationError, UserInputError } from 'apollo-server';

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
			if (body.trim() === '') {
				throw new Error('Post must not be empty');
			}
			const newPost = new Post({
				body,
				username: user.username,
				user: user.id,
			});
			const createdPost = await newPost.save();
			return createdPost;
		},

		deletePost: async (_, { postId }, context) => {
			const user = checkAuth(context);
			try {
				const post = await Post.findById(postId);
				if (post) {
					if (post.user.equals(user.id)) {
						const deletedPost = await Post.findByIdAndDelete(postId);
						return 'Post deleted successfully';
					} else {
						throw new AuthenticationError(`Unauthorized`);
					}
				} else {
					throw new Error(`Post not found`);
				}
			} catch (error) {
				throw new Error(error);
			}
		},

		likePost: async (_, { postId }, context) => {
			const { username } = checkAuth(context);
			try {
				const post = await Post.findById(postId);
				if (post) {
					const alreadyLiked = await post.likes.findIndex(
						(like) => like.username === username
					);
					console.log(alreadyLiked);
					if (alreadyLiked > -1) {
						post.likes.splice(alreadyLiked, 1);
					} else {
						await post.likes.push({ username });
						console.log(username);
					}
					await post.save();
					return post;
				} else {
					throw new Error(`Post not found`);
				}
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		},
	},
};

export default postsResolvers;
