import React from 'react';

const UserInfo = ({user}) => {
	// console.log('name', props.userProps.name);
	// console.log('entries', props.userProps.entries);
	return(
		<div>
			<div className='white f3'>
				{`${user.name} , your current rank is...`}
			</div>
			<div className='white f1'>
				{user.entries}
			</div>
		</div>
		);
}

export default UserInfo;
