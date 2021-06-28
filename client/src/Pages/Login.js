import React, { useState, useContext, useEffect } from 'react';
import {
	Form,
	Button,
	Message,
	Grid,
	Header,
	Segment,
} from 'semantic-ui-react';
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
	useEffect(() => {
		if (context.user) {
			history.push('/');
		}
	}, [history, context]);
	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Log-in to your account
				</Header>
				<Form
					size='large'
					onSubmit={submitHandler}
					noValidate
					className={loading ? 'loading' : ''}
					error>
					<Segment stacked>
						{errors.general && <Message error content={errors.general} />}

						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='Username...'
							type='text'
							name='username'
							value={values.username}
							onChange={onChangeHandler}
						/>
						{errors.username && <Message error content={errors.username} />}

						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							name='password'
							value={values.password}
							onChange={onChangeHandler}
						/>
						{errors.password && <Message error content={errors.password} />}

						<Button color='teal' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
				
			</Grid.Column>
		</Grid>
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
