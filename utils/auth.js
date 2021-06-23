import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import dotenv from 'dotenv';

dotenv.config();

export default (context) => {
	const authHeader = context.req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split('Bearer ')[1];
		if (token) {
			try {
				const user = jwt.verify(token, process.env.JWT_SECRET);
				return user;
			} catch (error) {
				throw new AuthenticationError(`Expired/Invalid token.`);
			}
		} else {
			throw new Error("Authentication token must be 'Bearer [token]'");
		}
	} else {
		throw new Error(`Authrization header is missing`);
	}
};
