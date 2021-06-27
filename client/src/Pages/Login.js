import React, { useState, useContext } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';

const Login = ({ history }) => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const [values, setValues] = useState({
		username: '',
		password: '',
	});
	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(proxy, result) {
			if (result) {
				setValues({
					username: '',
					password: '',
				});
				context.login(result.data.login);
				history.push('/');
			}
		},
		onError(err) {
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
		loginUser();
	};
	return (
		<div>
			<Form
				onSubmit={submitHandler}
				noValidate
				className={loading ? 'loading' : ''}
				error>
				<h1>Login</h1>
				{console.log(errors)}
				{errors.general && <Message error content={errors.general} />}
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
					label='Password'
					placeholder='Password...'
					type='password'
					name='password'
					value={values.password}
					onChange={onChangeHandler}
				/>
				{errors.password && <Message error content={errors.password} />}
				<Button type='submit' primary>
					Login
				</Button>
			</Form>
		</div>
	);
};

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Login;
