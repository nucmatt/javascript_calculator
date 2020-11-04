import React from 'react';

const InputBtn = ({ input: { id, value, actionType }, handleClick }) => {
	return (
		<button id={id} className='btn' onClick={() => handleClick(actionType, value)}>
			{value}
		</button>
	);
};

export default InputBtn;
