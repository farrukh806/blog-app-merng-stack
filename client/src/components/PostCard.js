import React from 'react';
import moment from 'moment';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';

const PostCard = ({ post: { body, createdAt, username, likes, comments } }) => {
	const likePostHandler = () => {};

	const commentPostHandler = () => {};
	return (
		<Card fluid style={{ margin: 3 }}>
			<Card.Content>
				<Image
					floated='right'
					size='mini'
					src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>
					{moment(new Date(createdAt).toDateString()).fromNow()}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content>
				<Button as='div' labelPosition='right' onClick={likePostHandler}>
					<Button color='red' basic>
						<Icon name='heart' />
					</Button>
					<Label basic color='red' pointing='left'>
						{likes.length}
					</Label>
				</Button>

				<Button as='div' labelPosition='right' onClick={commentPostHandler}>
					<Button color='teal' basic>
						<Icon name='comments' />
					</Button>
					<Label basic color='teal' pointing='left'>
						{comments.length}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
