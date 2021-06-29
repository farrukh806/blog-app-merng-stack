import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

const DeleteButton = ({ username, deleteHandler, id }) => {
	const context = useContext(AuthContext);

	return (
		<>
			{context.user && context.user.username === username && (
				<Button
					as='div'
					icon='trash'
					color='red'
					floated='right'
					onClick={() => deleteHandler(id)}></Button>
			)}
		</>
	);
};

export default DeleteButton;
