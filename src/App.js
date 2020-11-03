import { useReducer } from 'react';
import './scss/style.scss';
import InputBtn from './components/InputBtn';

function App() {
	const initialState = { eqn: 'equation' };
	const eqnReducer = (state, action) => {
		switch (action.type) {
			case 'UPDATE':
				return { eqn: (state.eqn + action.payload) };
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
	}
	const secondaryFuncs = [
		{ id: 'mem-clear', value: 'MC' },
		{ id: 'mem-recall', value: 'MR' },
		{ id: 'mem-add', value: 'M+' },
		{ id: 'clear-display', value: 'AC' },
	];
	const numbpadBtns = [
		{ id: 'open-parentheses', value: '(' },
		{ id: 'seven', value: '7' },
		{ id: 'eight', value: '8' },
		{ id: 'nine', value: '9' },
		{ id: 'divide', value: '/' },
		{ id: 'close-parentheses', value: ')' },
		{ id: 'four', value: '4' },
		{ id: 'five', value: '5' },
		{ id: 'six', value: '6' },
		{ id: 'multiply', value: '*' },
		{ id: 'exponent', value: '^' },
		{ id: 'one', value: '1' },
		{ id: 'two', value: '2' },
		{ id: 'three', value: '3' },
		{ id: 'subtract', value: '-' },
		{ id: 'backspace', value: 'del' },
		{ id: 'zero', value: '0' },
		{ id: 'period', value: '.' },
		{ id: 'equals', value: '=' },
		{ id: 'add', value: '+' },
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
							<InputBtn input={button} onClick={handleClick}/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
