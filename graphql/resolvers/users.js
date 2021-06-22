import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import User from '../../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const usersResolvers = {
	Mutation: {
		register: async (
			_,
			{ registerInput: { username, password, confirmPassword, email } },
			context,
			info
		) => {
			//TODO  validate user data
			//TODO  make sure user already not exist
			const isUserExists = await User.findOne({ username });
			if (isUserExists) {
				throw new UserInputError(`Username already taken`, {
					errors: {
						username: 'This username is taken',
					},
				});
			} else {
				//TODO hash the password
				password = await bcrypt.hash(password, 12);
				const user = new User({
					email,
					username,
					password,
				});

				const createdUser = await user.save();
				const token = await jwt.sign(
					{
						id: createdUser._id,
						email: createdUser.email,
						username: createdUser.username,
					},
					process.env.JWT_SECRET,
					{ expiresIn: '12h' }
				);

				return {
					id: createdUser._id,
					email: createdUser.email,
					username: createdUser.username,
					token,
					createdAt: createdUser.createdAt.toDateString(),
				};
			}
		},
	},
};

export default usersResolvers;
