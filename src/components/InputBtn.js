import React from 'react';

const InputBtn = ({ input: { id, value } }) => {
	return (
		<button id={id} className='btn' onClick={() => console.log(value)}>
			{value}
		</button>
	);
};

export default InputBtn;
