import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const Header = () => {
	const [activeItem, setActiveItem] = useState('home');
	const pathName = window.location.pathname;
	const path = pathName === '/' ? 'home' : pathName.substr(1);

	useEffect(() => {
		setActiveItem(path);
	}, [path]);

	const handleItemClick = (e, { name }) => setActiveItem(name);
	return (
		<Menu pointing secondary size='large' fluid color='teal'>
			<Menu.Item
				name='home'
				value='home'
				active={activeItem === 'home'}
				onClick={handleItemClick}
				as={Link}
				to='/'
			/>

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
		</Menu>
	);
};

export default Header;
