import { UserInputError } from 'apollo-server';
import Post from '../../models/Post.js';
import checkAuth from '../../utils/auth.js';

const commentResolvers = {
	Mutation: {
		createComment: async (_, { postId, body }, context) => {
			const { username } = checkAuth(context);
			if (body.trim() === '') {
				throw new UserInputError(`Comment must not be empty.`, {
					errors: {
						body: 'Body must not be empty',
					},
				});
			} else {
				try {
					const post = await Post.findById(postId);
					if (post) {
						post.comments.unshift({
							body,
							username,
						});
						await post.save();
						return post;
					} else {
						throw new Error('Post not found');
					}
				} catch (error) {
					throw new Error(error);
				}
			}
		},

		deleteComment: async (_, { postId, commentId }, context) => {
			const { username } = checkAuth(context);
			try {
				const post = await Post.findById(postId);
				if (post) {
					const commentIdx = await post.comments.findIndex(
						(c) => c.id === commentId
					);
					if (commentIdx > -1) {
						const commentAuthor = await post.comments[commentIdx].username;
						if (commentAuthor === username) {
							post.comments.splice(commentIdx, 1);
							await post.save();
							return post;
						} else throw new Error(`Unauthorized access`);
					} else {
						throw new Error('Comment not found');
					}
				}
			} catch (error) {
				throw new Error(error);
			}
		},
	},
};

export default commentResolvers;
