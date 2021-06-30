import { createContext, useReducer } from 'react';
import jwt from 'jsonwebtoken';
import { LOGIN, LOGOUT } from '../constants/auth';

const initialState = {
	user: null,
};

if (localStorage.getItem('token')) {
	const decodedToken = jwt.decode(localStorage.getItem('token'));
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('token');
	} else {
		initialState.user = decodedToken;
	}
}

const AuthContext = createContext({
	user: initialState.user,
	login: (data) => {},
	logout: () => {},
});

const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

const AuthProvider = (props) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const login = (data) => {
		localStorage.setItem('token', data.token);
		dispatch({ type: LOGIN, payload: data });
	};

	const logout = () => {
		localStorage.removeItem('token');
		dispatch({ type: LOGOUT });
	};
	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
