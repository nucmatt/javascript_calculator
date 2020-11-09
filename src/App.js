import { useReducer } from 'react';
import './scss/style.scss';
import InputBtn from './components/InputBtn';

function App() {
	const initialState = { eqn: '' };
	const calculate = (equation) => {
		const outputStack = [];
		const operatorStack = [];
		const eqnArray = equation.split(' ');
		console.log(eqnArray);
		while (eqnArray.length > 0) {
			let token = eqnArray[0];
			let operator = operatorStack[0];
			if (parseInt(token)) {
				outputStack.push(parseInt(token))
				eqnArray.shift();
			} else if (operator) {
				evalOperators(operator, operatorStack);
			} else {
				operatorStack.push(operator);
			}
		}
		console.log(outputStack, operatorStack, eqnArray);
	};

	const evalOperators = (operator, stack) => {
		const precedence = {
			'^': 4,
			'*': 3,
			'/': 3,
			'+': 2,
			'-': 2,
		};
		const associativity = {
			'^': 'right',
			'*': 'left',
			'/': 'left',
			'+': 'left',
			'-': 'left',
		};
		// determine precedence
		// if stack[0] operator has higher precedence OR equal precedence AND left associative AND stack[0] is not a left parenthesis
		// shift stack[0] operator and push to output stack
		// else push operator to operator stack
		// return console.log(precedence[operator], associativity[operator]);
	};
	// evalOperators('/');
	const eqnReducer = (state, action) => {
		switch (action.type) {
			case 'UPDATE_EQN':
				return { eqn: state.eqn + action.payload };
			case 'SOLVE_EQN':
				calculate(state.eqn);
				return state;
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(eqnReducer, initialState);

	const handleClick = (actionType, value) => {
		dispatch({
			type: actionType,
			payload: value,
		});
		console.log(value);
	};

	const secondaryFuncs = [
		{ id: 'mem-clear', value: 'MC' },
		{ id: 'mem-recall', value: 'MR' },
		{ id: 'mem-add', value: 'M+' },
		{ id: 'clear-display', value: 'AC' },
	];
	const numbpadBtns = [
		{ id: 'open-parentheses', value: ' ( ', actionType: 'UPDATE_EQN' },
		{ id: 'seven', value: '7', actionType: 'UPDATE_EQN' },
		{ id: 'eight', value: '8', actionType: 'UPDATE_EQN' },
		{ id: 'nine', value: '9', actionType: 'UPDATE_EQN' },
		{ id: 'divide', value: ' / ', actionType: 'UPDATE_EQN' },
		{ id: 'close-parentheses', value: ' )', actionType: 'UPDATE_EQN' },
		{ id: 'four', value: '4', actionType: 'UPDATE_EQN' },
		{ id: 'five', value: '5', actionType: 'UPDATE_EQN' },
		{ id: 'six', value: '6', actionType: 'UPDATE_EQN' },
		{ id: 'multiply', value: ' * ', actionType: 'UPDATE_EQN' },
		{ id: 'exponent', value: ' ^ ', actionType: 'UPDATE_EQN' },
		{ id: 'one', value: '1', actionType: 'UPDATE_EQN' },
		{ id: 'two', value: '2', actionType: 'UPDATE_EQN' },
		{ id: 'three', value: '3', actionType: 'UPDATE_EQN' },
		{ id: 'subtract', value: ' - ', actionType: 'UPDATE_EQN' },
		{ id: 'backspace', value: 'del' },
		{ id: 'zero', value: '0', actionType: 'UPDATE_EQN' },
		{ id: 'period', value: '.', actionType: 'UPDATE_EQN' },
		{ id: 'equals', value: '=', actionType: 'SOLVE_EQN' },
		{ id: 'add', value: ' + ', actionType: 'UPDATE_EQN' },
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
							<InputBtn input={button} handleClick={handleClick} />
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
