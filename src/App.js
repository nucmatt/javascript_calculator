import { useReducer } from 'react';
import './scss/style.scss';
import InputBtn from './components/InputBtn';
import eqnReducer from './eqnReducer';
import { solution } from './utilityFunctions';

function App() {
	const initialState = {
		eqn: '',
		lastInput: '',
	};
	const [state, dispatch] = useReducer(eqnReducer, initialState);
	const handleClick = (actionType, value) => {
		dispatch({
			type: actionType,
			payload: value,
		});
		console.log(actionType, value);
		console.table(state);
	};

	const secondaryFuncs = [
		{ id: 'backspace', value: 'BS', actionType: 'BACKSPACE' },
		{ id: 'mem-clear', value: 'M-', actionType: 'MEM_CLEAR' },
		{ id: 'mem-recall', value: 'MR', actionType: 'MEM_RECALL' },
		{ id: 'mem-add', value: 'M+', actionType: 'MEM_ADD' },
		{ id: 'clear', value: 'C', actionType: 'CLEAR_ALL' },
	];
	const numbpadBtns = [
		{ id: 'seven', value: '7', actionType: 'UPDATE_EQN' },
		{ id: 'eight', value: '8', actionType: 'UPDATE_EQN' },
		{ id: 'nine', value: '9', actionType: 'UPDATE_EQN' },
		{ id: 'divide', value: '/', actionType: 'OPERATOR_INPUT' },
		{ id: 'parentheses', value: '()', actionType: 'PAREN_INPUT' },
		{ id: 'four', value: '4', actionType: 'UPDATE_EQN' },
		{ id: 'five', value: '5', actionType: 'UPDATE_EQN' },
		{ id: 'six', value: '6', actionType: 'UPDATE_EQN' },
		{ id: 'multiply', value: '*', actionType: 'OPERATOR_INPUT' },
		{ id: 'signchange', value: '+/-', actionType: 'CHANGE_SIGN' },
		{ id: 'one', value: '1', actionType: 'UPDATE_EQN' },
		{ id: 'two', value: '2', actionType: 'UPDATE_EQN' },
		{ id: 'three', value: '3', actionType: 'UPDATE_EQN' },
		{ id: 'subtract', value: '-', actionType: 'OPERATOR_INPUT' },
		{ id: 'exponent', value: '^', actionType: 'OPERATOR_INPUT' },
		{ id: 'decimal', value: '.', actionType: 'DECIMAL_INPUT' },
		{ id: 'zero', value: '0', actionType: 'ZERO_INPUT' },
		{ id: 'equals', value: '=', actionType: 'SOLVE_EQN' },
		{ id: 'add', value: '+', actionType: 'OPERATOR_INPUT' },
	];
	return (
		<div className='container bg-primary'>
			<main>
				<div id='calculator'>
					<div id='eqn' className='text-right'>
						{state.eqn ? state.eqn : 'Start Calculating!'}
					</div>
					<div id='display' className='text-right'>
						{solution(state.eqn)}
					</div>
					<div id='secondary-funcs'>
						{secondaryFuncs.map((button) => (
							<InputBtn input={button} handleClick={handleClick} />
						))}
					</div>
					<div id='numpad'>
						{numbpadBtns.map((button) => (
							<InputBtn input={button} handleClick={handleClick} />
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
