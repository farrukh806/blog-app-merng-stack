import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';

const Register = ({ history }) => {
	const context = useContext(AuthContext);

	const [errors, setErrors] = useState({});

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(proxy, result) {
			if (result) {
				setValues({
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
				});
				context.login(result.data.register);
				history.push('/');
			}
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.exception.errors);

			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});
	const onChangeHandler = (e) => {
		setErrors({ ...errors, [e.target.name]: '' });
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const submitHandler = (e) => {
		e.preventDefault();
		addUser();
	};

	useEffect(() => {
		if (context.user) {
			history.push('/');
		}
	}, [context, history]);

	return (
		<div>
			<Form
				onSubmit={submitHandler}
				noValidate
				className={loading ? 'loading' : ''}
				error>
				<h1>Register</h1>
				<Form.Input
					label='Username'
					placeholder='Username...'
					type='text'
					name='username'
					value={values.username}
					onChange={onChangeHandler}
				/>

				{errors.username && <Message error content={errors.username} />}
				<Form.Input
					label='Email'
					placeholder='Email...'
					type='email'
					name='email'
					value={values.email}
					onChange={onChangeHandler}
				/>
				{errors.email && <Message error content={errors.email} />}
				<Form.Input
					label='Password'
					placeholder='Password...'
					type='password'
					name='password'
					value={values.password}
					onChange={onChangeHandler}
				/>
				<Form.Input
					label='Confirm Password'
					placeholder='Confirm Password...'
					type='password'
					name='confirmPassword'
					value={values.confirmPassword}
					onChange={onChangeHandler}
				/>
				{(errors.password || errors.password) && (
					<Message error content={errors.password} />
				)}
				<Button type='submit' primary>
					Register
				</Button>
			</Form>
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
