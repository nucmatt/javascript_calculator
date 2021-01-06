import { useReducer } from 'react';
import './scss/style.scss';
import InputBtn from './components/InputBtn';

function App() {
	const initialState = {
		eqn: '',
		// currentNum: '0',
		lastInput: '',
		solution: '0',
	};
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
	const infixToPostfix = (string) => {
		let outputStack = [];
		let operatorStack = [];
		let infixArray = string.split(' ');
		while (infixArray.length > 0) {
			let token = infixArray.shift();
			let operator = operatorStack[0];
			// if token is a number, push it to outputStack
			if (parseFloat(token)) {
				outputStack.push(parseFloat(token));
				console.log(outputStack, operatorStack, infixArray);
				// else if token is an operator evaluate token against operatorStack operators, if any
			} else if (operator && token !== ')') {
				// while current operator has precedence -OR- if equal precedence and current token is left associative,
				while (
					greaterPrecedence(operator, token) ||
					leftAssociative(operator, token)
				) {
					// push operators to outputStack
					outputStack.push(operator);
					operatorStack.shift();
					operator = operatorStack[0];
					console.log(outputStack, operatorStack, infixArray, token);
				}
				// then push current token to front of operatorStack
				operatorStack.unshift(token);
				console.log(outputStack, operatorStack, infixArray, token);
			} else if (token === ')') {
				while (operator !== '(' && operatorStack.length > 0) {
					outputStack.push(operator);
					operatorStack.shift();
					operator = operatorStack[0];
					console.log('if executed');
					console.log(outputStack, operatorStack, infixArray, token);
				}
				if (operator === '(') {
					operatorStack.shift();
					console.log(outputStack, operatorStack, infixArray, token);
				}
			} else {
				// if no operatorStack operators, push token to operatorStack
				operatorStack.push(token);
			}
			console.log(outputStack, operatorStack, infixArray, token);
		}
		// once infixArray is empty push operator stack onto output stack
		while (operatorStack[0]) {
			outputStack.push(operatorStack.shift());
		}
		console.log(outputStack, operatorStack, infixArray);
		return outputStack;
	};

	const solvePostfix = (string) => {
		const stack = [];
		const expression = infixToPostfix(string);
		let a, b, solution;
		console.log(expression);
		for (let i = 0; i < expression.length; i++) {
			switch (expression[i]) {
				case '+':
					a = stack.pop();
					b = stack.pop();
					stack.push(b + a);
					console.log(stack);
					break;
				case '-':
					a = stack.pop();
					b = stack.pop();
					stack.push(b - a);
					console.log(stack);
					break;
				case '*':
					a = stack.pop();
					b = stack.pop();
					stack.push(b * a);
					console.log(stack);
					break;
				case '/':
					a = stack.pop();
					b = stack.pop();
					stack.push(b / a);
					console.log(stack);
					break;
				case '^':
					a = stack.pop();
					b = stack.pop();
					stack.push(Math.pow(b, a));
					console.log(stack);
					break;
				default:
					stack.push(expression[i]);
					console.log(stack);
			}
		}
		solution = stack.pop();
		return solutionPrecision(solution);
	};
	const solutionPrecision = (result) => {
		if (result === '0') {
			return 0;
		} else if (Number.isInteger(result)) {
			return result;
		} else if (Number.isFinite(result)) {
			return result.toFixed(4);
		} else {
			return '...';
		}
	};
	const greaterPrecedence = (operator, token) => {
		return precedence[operator] > precedence[token];
	};
	const leftAssociative = (operator, token) => {
		return (
			precedence[operator] === precedence[token] &&
			associativity[token] === 'left'
		);
	};
	const mismatchParen = (string) => {
		let stack = [];
		for (let i = 0; i < string.length; i++) {
			if (string[i] === '(') {
				stack.push(i);
			} else if (string[i] === ')') {
				stack.pop();
			}
		}
		console.log(string.slice(0, stack[0]) + string.slice(stack[0] + 1));
		;
		return stack;
	};
	const filterParen = (string) => {
		let index, filtered, mismatches;
		mismatches = mismatchParen(string);
		filtered = string;
		console.log(filtered, mismatches, mismatches.length);
		for (let i = 0; i < mismatches.length; i++) {
			index = mismatches[i];
			console.log(mismatches, index, filtered);
			if (index === 0) {
				filtered = filtered.slice(1);
			} else {
				filtered = filtered.slice(0, index) + filtered.slice(index + 1);
			}
		}
		return filtered;
	};
	const eqnReducer = (state, action) => {
		switch (action.type) {
			case 'CHANGE_SIGN':
				if(state.lastInput === '') {
					return {
						...state,
					}
				} else if (isFinite(state.lastInput)) {
					let x = state.lastInput * -1;
					console.log(state.lastInput.length);
					return {
						...state,
						eqn: state.eqn.slice(0, -state.lastInput.length) + x,
						lastInput: x.toString(),
					}
				} else {
					return state;
				}
			case 'CLEAR_ALL':
				return {
					...state,
					eqn: '',
					// currentNum: '0',
					lastInput: '',
					solution: '0',
				};
			case 'PAREN_INPUT':
				let mismatches = mismatchParen(state.eqn);
				if (state.eqn === '') {
					console.log('eqn is blank');
					return {
						...state,
						eqn: '(',
						lastInput: '(',
					};
				} else if (precedence[state.lastInput] || state.lastInput === '(') {
					console.log('last input is operator or open paren');
					return {
						...state,
						eqn: state.eqn + ' (',
						lastInput: '(',
					};
				} else if (mismatches.length > 0 && isFinite(state.lastInput)) {
					console.log('mismatched paren and last input is a number');
					return {
						...state,
						eqn: state.eqn + ' )',
						lastInput: ')',
					};
				} else if (mismatches.length > 0 && state.lastInput === ')') {
					console.log('mismatched paren and last input is close paren');
					return { ...state, eqn: state.eqn + ' )', lastInput: ')' };
				} else if (state.lastInput === ')' || isFinite(state.lastInput)) {
					console.log('last input is a close paren or a number');
					return {
						...state,
						eqn: state.eqn + ' * (',
						lastInput: '(',
					};
				} else {
					return {
						...state,
					};
				}
			case 'DECIMAL_INPUT':
				if (state.eqn === '') {
					return {
						...state,
						eqn: '0.',
						lastInput: '0.'
					};
				} else if (state.lastInput.endsWith('.')) {
					return {
						...state
					}
				} else if (state.lastInput === ')' || state.lastInput.includes('.')) {
					return {
						...state,
						eqn: state.eqn + ' * 0.',
						lastInput: '0.',
					};
				} else if (Number.isInteger(+state.lastInput) && !state.lastInput.includes('.')) {
					return {
						...state,
						eqn: state.eqn + action.payload,
						lastInput: state.lastInput + '.',
					};
				} else {
					return {
						...state,
						// eqn: state.eqn + ' 0.',
						// lastInput: '0.',
					};
				}
			case 'UPDATE_EQN':
				if (state.lastInput === '0') {
					return {
						...state,
						eqn: state.eqn.slice(0, -1) + action.payload,
						lastInput: action.payload,
					};
				} else if (state.lastInput === ')') {
					return {
						...state,
						eqn: state.eqn + ' * ' + action.payload,
						lastInput: action.payload,
					};
				} else if (precedence[state.lastInput] || state.lastInput === '(') {
					return {
						...state,
						eqn: state.eqn + ' ' + action.payload,
						lastInput: action.payload,
					};
				} else {
					return {
						...state,
						eqn: state.eqn + action.payload,
						lastInput: state.lastInput + action.payload,
						// solution: solvePostfix([
						// 	...state.eqnArray,
						// 	state.currentNum + action.payload,
						// ]),
					};
				}
			case 'MEM_ADD':
				sessionStorage.setItem('number', state.solution);
				return {
					...state,
				};
			case 'MEM_CLEAR':
				sessionStorage.removeItem('number');
				return {
					...state,
				};
			case 'MEM_RECALL':
				let numFromMem = sessionStorage.getItem('number');
				if (numFromMem && state.eqn === '') {
					return {
						...state,
						eqn: numFromMem,
						lastInput: numFromMem,
					};
				} else if (numFromMem && precedence[state.lastInput]) {
					return {
						...state,
						eqn: state.eqn + ' ' + numFromMem,
						lastInput: numFromMem,
					};
				} else {
					return {
						...state,
					};
				}
			// case 'OPENPAREN_INPUT':
			// 	if (state.lastInput === '0') {
			// 		return {
			// 			...state,
			// 			eqn: state.eqn.slice(0, -1) + action.payload,
			// 			lastInput: action.payload,
			// 		};
			// 	} else if (precedence[state.lastInput] || state.lastInput === '(') {
			// 		return {
			// 			...state,
			// 			eqn: state.eqn + ' ' + action.payload,
			// 			lastInput: action.payload,
			// 		};
			// 	} else if (
			// 		state.lastInput === ')' ||
			// 		Number.isFinite(state.lastInput)
			// 	) {
			// 		return {
			// 			...state,
			// 			eqn: state.eqn + ' * ' + action.payload,
			// 			lastInput: action.payload,
			// 		};
			// 	} else {
			// 		return {
			// 			...state,
			// 		};
			// 	}
			case 'OPERATOR_INPUT':
				if (state.lastInput === '(' || state.eqn === '') {
					return {
						...state,
					};
				} else if (precedence[state.lastInput]) {
					return {
						...state,
						eqn: state.eqn.slice(0, -1) + action.payload,
						lastInput: action.payload,
					};
				} else {
					return {
						...state,
						eqn: state.eqn + ' ' + action.payload,
						lastInput: action.payload,
					};
				}
			case 'OPERATOR_SUBTRACT':
				if (state.lastInput === action.payload) {
					return {
						...state,
					};
				} else {
					return {
						...state,
						eqn: state.eqn + ' ' + action.payload,
						lastInput: action.payload,
					};
				};
			case 'SOLVE_EQN':
				let solution = solvePostfix(state.eqn);
				return {
					...state,
					eqn: solution,
					lastInput: solution,
					solution: solution,
				};
			case 'ZERO_INPUT':
				if (state.lastInput.startsWith('0') && !state.lastInput[1]) {
					return {
						...state,
					};
				} else if (state.lastInput === ')') {
					return {
						...state,
						eqn: state.eqn + ' * ' + action.payload,
						lastInput: action.payload,
					};
				} else if (state.lastInput === '(' || precedence[state.lastInput]) {
					return {
						...state,
						eqn: state.eqn + ' ' + action.payload,
						lastInput: action.payload,
					};
				} else {
					return {
						...state,
						eqn: state.eqn + action.payload,
						lastInput: state.lastInput + action.payload,
					};
				}
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
		console.log(actionType, value);
		console.table(state);
	};

	const secondaryFuncs = [		
		{ id: 'backspace', value: 'BS' },
		{ id: 'mem-clear', value: 'MC', actionType: 'MEM_CLEAR' },
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
						{state.eqn}
					</div>
					<div id='display' className='text-right'>
						{solvePostfix(state.eqn)}
					</div>
					<div id='secondary-funcs'>
						{/* <div className='blank'></div> */}
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
