import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		username: String,
		email: String,
		password: String,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('Users', userSchema);

export default User;
