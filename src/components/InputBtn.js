import React from 'react';

const InputBtn = ({ input: { id, value } }) => {
	return (
		<button id={id} className='btn'>
			{value}
		</button>
	);
};

export default InputBtn;
