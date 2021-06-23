import jwt from 'jsonwebtoken';

const generateToken = async ({ id, email, username }) => {
	const token = await jwt.sign(
		{
			id,
			email,
			username,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '30d' }
	);

	return token;
};

export default generateToken;
