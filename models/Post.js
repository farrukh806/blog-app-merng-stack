import mongoose from 'mongoose';
const commentSchema = mongoose.Schema(
	{
		body: String,
		username: String,
	},
	{ timestamps: true }
);

const likeSchema = mongoose.Schema(
	{
		username: String,
	},
	{
		timestamps: true,
	}
);

const postSchema = mongoose.Schema(
	{
		body: String,
		username: String,
		comments: [commentSchema],
		likes: [likeSchema],
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
