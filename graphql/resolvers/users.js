import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';
import generateToken from '../../utils/generateToken.js';
import User from '../../models/User.js';
import {
	validateRegisterInput,
	validateLoginInput,
} from '../../utils/validators.js';
dotenv.config();

const usersResolvers = {
	Mutation: {
		register: async (
			_,
			{ registerInput: { username, password, confirmPassword, email } },
			context,
			info
		) => {
			// Validate user data
			const { errors, valid } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			//  Make sure user already not exist
			const isUserExists = await User.findOne({ username });
			if (isUserExists) {
				throw new UserInputError(`Username already taken`, {
					errors: {
						username: 'This username is taken',
					},
				});
			} else {
				// Hash the password
				password = await bcrypt.hash(password, 12);
				const user = new User({
					email,
					username,
					password,
				});

				const createdUser = await user.save();
				const token = generateToken(createdUser);
				return {
					id: createdUser._id,
					email: createdUser.email,
					username: createdUser.username,
					token,
					createdAt: createdUser.createdAt.toDateString(),
				};
			}
		},

		login: async (_, { username, password }, context, info) => {
			const { errors, valid } = validateLoginInput(username, password);
			if (!valid) {
				throw new UserInputError('Errors', { errors });
			}
			// Find the user with the given username
			const user = await User.findOne({ username });
			if (!user) {
				errors.general = `User not found`;
				throw new UserInputError(`Username or password is incorrect`, {
					errors,
				});
			} else {
				const match = bcrypt.compare(password, user.password);
				if (!match) {
					errors.general = `Username or password is incorrect`;
					throw new UserInputError(`Username or password is incorrect`, {
						errors,
					});
				} else {
					const token = generateToken(user);
					return {
						id: user._id,
						email: user.email,
						username: user.username,
						token,
						createdAt: user.createdAt.toDateString(),
					};
				}
			}
		},
	},
};

export default usersResolvers;
