import { useReducer } from 'react';
import './scss/style.scss';
import InputBtn from './components/InputBtn';

function App() {
	const initialState = { eqn: '' };
	const eqnReducer = (state, action) => {
		switch (action.type) {
			case 'UPDATE_EQN':
				return { eqn: (state.eqn + action.payload) };
			case 'SOLVE_EQN':
				console.log(state)
				return state;
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(eqnReducer, initialState);

	const handleClick = (actionType, value) => {
		dispatch({
			type: actionType,
			payload: value
		})
		console.log(value);
	}
	const secondaryFuncs = [
		{ id: 'mem-clear', value: 'MC' },
		{ id: 'mem-recall', value: 'MR' },
		{ id: 'mem-add', value: 'M+' },
		{ id: 'clear-display', value: 'AC' },
	];
	const numbpadBtns = [
		{ id: 'open-parentheses', value: '(', actionType: 'UPDATE_EQN' },
		{ id: 'seven', value: '7', actionType: 'UPDATE_EQN' },
		{ id: 'eight', value: '8', actionType: 'UPDATE_EQN' },
		{ id: 'nine', value: '9', actionType: 'UPDATE_EQN' },
		{ id: 'divide', value: '/', actionType: 'UPDATE_EQN' },
		{ id: 'close-parentheses', value: ')', actionType: 'UPDATE_EQN' },
		{ id: 'four', value: '4', actionType: 'UPDATE_EQN' },
		{ id: 'five', value: '5', actionType: 'UPDATE_EQN' },
		{ id: 'six', value: '6', actionType: 'UPDATE_EQN' },
		{ id: 'multiply', value: '*', actionType: 'UPDATE_EQN' },
		{ id: 'exponent', value: '^', actionType: 'UPDATE_EQN' },
		{ id: 'one', value: '1', actionType: 'UPDATE_EQN' },
		{ id: 'two', value: '2', actionType: 'UPDATE_EQN' },
		{ id: 'three', value: '3', actionType: 'UPDATE_EQN' },
		{ id: 'subtract', value: '-', actionType: 'UPDATE_EQN' },
		{ id: 'backspace', value: 'del' },
		{ id: 'zero', value: '0', actionType: 'UPDATE_EQN' },
		{ id: 'period', value: '.', actionType: 'UPDATE_EQN' },
		{ id: 'equals', value: '=', actionType: 'SOLVE_EQN' },
		{ id: 'add', value: '+', actionType: 'UPDATE_EQN' },
	];
	return (
		<div className='container bg-primary'>
			<main>
				<div id='calculator'>
					<div id='display'>{state.eqn}</div>
					<div id='secondary-funcs'>
						<div className='blank'></div>
						{secondaryFuncs.map((button) => (
							<InputBtn input={button} />
						))}
					</div>
					<div id='numpad'>
						{numbpadBtns.map((button) => (
							<InputBtn input={button} handleClick={handleClick}/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
