import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
	{
		body: String,
		username: String,
		comments: [
			{
				body: String,
				username: String,
			},
			{
				timestamps: true,
			},
		],
		likes: [
			{
				username: String,
			},
			{
				timestamps: true,
			},
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model('Posts', postSchema);

export default Post;
