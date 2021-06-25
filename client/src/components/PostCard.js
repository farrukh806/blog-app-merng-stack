import React from 'react';
import moment from 'moment';
import { Button, Card, Image } from 'semantic-ui-react';

const PostCard = ({ post: { body, createdAt, username, likes, comments } }) => {
	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>{createdAt}</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<div className='ui two buttons'>
					<Button basic color='green'>
						Approve
					</Button>
					<Button basic color='red'>
						Decline
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
