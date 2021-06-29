import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
const LikeButton = ({ likes, likePostHandler, id }) => {
	return (
		<>
			<Button
				as='div'
				labelPosition='right'
				onClick={() => likePostHandler(id)}>
				<Button color='red' basic>
					<Icon name='heart' />
				</Button>
				<Label basic color='red' pointing='left'>
					{likes.length}
				</Label>
			</Button>
		</>
	);
};

export default LikeButton;
