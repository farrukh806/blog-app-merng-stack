import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

const Header = () => {
	const context = useContext(AuthContext);

	const [activeItem, setActiveItem] = useState('home');
	const pathName = window.location.pathname;
	const path = pathName === '/' ? 'home' : pathName.substr(1);

	useEffect(() => {
		setActiveItem(path);
	}, [path, context]);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const handleLogout = () => context.logout();

	return (
		<Menu pointing secondary size='large' fluid color='teal'>
			<Menu.Menu position='left'>
				{!context.user ? (
					<Menu.Item name='Home' value='home' active as={Link} to='/' />
				) : (
					<Menu.Item
						name={context.user.username}
						value={context.user.username}
						active
						as={Link}
						to='/'
					/>
				)}
			</Menu.Menu>
			{context.user ? (
				<Menu.Menu position='right'>
					<Menu.Item
						name='Logout'
						value='logout'
						onClick={handleLogout}
						position='right'
					/>
				</Menu.Menu>
			) : (
				<Menu.Menu position='right'>
					<Menu.Item
						name='login'
						value='login'
						active={activeItem === 'login'}
						onClick={handleItemClick}
						as={Link}
						to='/login'
					/>
					<Menu.Item
						name='register'
						value='register'
						active={activeItem === 'register'}
						onClick={handleItemClick}
						as={Link}
						to='/register'
					/>
				</Menu.Menu>
			)}
		</Menu>
	);
};

export default Header;
