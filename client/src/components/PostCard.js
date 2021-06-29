import React, { useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';

import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

const PostCard = ({
	post: { body, createdAt, username, likes, comments, id },
}) => {
	const likePostHandler = (id) => {
		console.log('Liked ' + id);
	};

	const deleteHandler = (id) => console.log('Deleted ' + id);

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
				<LikeButton likePostHandler={likePostHandler} likes={likes} id={id} />
				<Button as={Link} labelPosition='right' to={`/posts/${id}`}>
					<Button color='teal' basic>
						<Icon name='comments' />
					</Button>
					<Label basic color='teal' pointing='left'>
						{comments.length}
					</Label>
				</Button>
				<DeleteButton
					username={username}
					deleteHandler={deleteHandler}
					id={id}
				/>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
