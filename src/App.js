import { useReducer } from 'react';
import './scss/style.scss';
import InputBtn from './components/InputBtn';

function App() {
	const initialState = { eqn: '0', eqnArray: [], currentNum: '' };
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
	const infixToPostfix = (array) => {
		let outputStack = [];
		let operatorStack = [];
		let infixArray = array;
		while (infixArray.length > 0) {
			let token = infixArray.shift();
			let operator = operatorStack[0];
			// if token is a number, push it to outputStack
			if (parseInt(token)) {
				outputStack.push(parseInt(token));
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
				while (operator !== '(') {
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

	const solvePostfix = (array) => {
		const stack = [];
		const expression = infixToPostfix(array);
		for (let i = 0; i < expression.length; i++) {
			switch (expression[i]) {
				case '+':
					stack.push(stack.pop() + stack.pop());
					break;
				case '-':
					stack.push(stack.pop() - stack.pop());
					break;
				case '*':
					stack.push(stack.pop() * stack.pop());
					break;
				case '/':
					stack.push(stack.pop() / stack.pop());
					break;
				default:
					stack.push(expression[i]);
			}
		}
		return stack.pop();
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
	const eqnReducer = (state, action) => {
		switch (action.type) {
			case 'UPDATE_EQN':
				return {
					...state,
					eqn: state.eqn + action.payload,
					currentNum: state.currentNum + action.payload,
				};
			case 'OPERATOR_INPUT':
				return {
					...state,
					eqn: state.eqn + action.payload,
					eqnArray: state.currentNum
						? [...state.eqnArray, state.currentNum, action.payload]
						: [...state.eqnArray, action.payload],
					currentNum: '',
				};
			case 'SOLVE_EQN':
				return { ...state, eqn: action.payload, eqnArray: [], currentNum: action.payload };
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(eqnReducer, initialState);

	const handleClick = (actionType, value) => {
		if (actionType === 'SOLVE_EQN') {
			const solution = state.currentNum ? solvePostfix([...state.eqnArray, state.currentNum]) : solvePostfix([...state.eqnArray]);
			dispatch({
				type: actionType,
				payload: solution
			})
		} else {
			dispatch({
				type: actionType,
				payload: value,
			});
		}
		console.table(state);
	};

	const secondaryFuncs = [
		{ id: 'mem-clear', value: 'MC' },
		{ id: 'mem-recall', value: 'MR' },
		{ id: 'mem-add', value: 'M+' },
		{ id: 'clear', value: 'AC' },
	];
	const numbpadBtns = [
		{ id: 'open-parentheses', value: '(', actionType: 'OPERATOR_INPUT' },
		{ id: 'seven', value: '7', actionType: 'UPDATE_EQN' },
		{ id: 'eight', value: '8', actionType: 'UPDATE_EQN' },
		{ id: 'nine', value: '9', actionType: 'UPDATE_EQN' },
		{ id: 'divide', value: '/', actionType: 'OPERATOR_INPUT' },
		{ id: 'close-parentheses', value: ')', actionType: 'OPERATOR_INPUT' },
		{ id: 'four', value: '4', actionType: 'UPDATE_EQN' },
		{ id: 'five', value: '5', actionType: 'UPDATE_EQN' },
		{ id: 'six', value: '6', actionType: 'UPDATE_EQN' },
		{ id: 'multiply', value: '*', actionType: 'OPERATOR_INPUT' },
		{ id: 'exponent', value: '^', actionType: 'OPERATOR_INPUT' },
		{ id: 'one', value: '1', actionType: 'UPDATE_EQN' },
		{ id: 'two', value: '2', actionType: 'UPDATE_EQN' },
		{ id: 'three', value: '3', actionType: 'UPDATE_EQN' },
		{ id: 'subtract', value: '-', actionType: 'OPERATOR_INPUT' },
		{ id: 'backspace', value: 'del' },
		{ id: 'zero', value: '0', actionType: 'UPDATE_EQN' },
		{ id: 'decimal', value: '.', actionType: 'UPDATE_EQN' },
		{ id: 'equals', value: '=', actionType: 'SOLVE_EQN' },
		{ id: 'add', value: '+', actionType: 'OPERATOR_INPUT' },
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
