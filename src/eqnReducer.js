import {
	precedence,
	solution,
	mismatchParen,
	signChange,
} from './utilityFunctions';

const eqnReducer = (state, action) => {
	switch (action.type) {
		case 'BACKSPACE':
			let newEqn, newInput;
			if (state.eqn === '') {
				return state;
			} else if (
				state.lastInput.startsWith('-') &&
				state.lastInput.length === 2
			) {
				newEqn = state.eqn.slice(0, -2).trim();
				newInput = newEqn.split(' ').pop();
				return {
					...state,
					eqn: newEqn,
					lastInput: newInput,
				};
			} else {
				newEqn = state.eqn.slice(0, -1).trim();
				newInput = newEqn.split(' ').pop();
				return {
					...state,
					eqn: newEqn,
					lastInput: newInput,
				};
			}
		case 'CHANGE_SIGN':
			if (state.lastInput === '') {
				return {
					...state,
				};
			} else if (isFinite(state.lastInput)) {
				let x = signChange(state.lastInput);
				console.log(state.lastInput.length);
				return {
					...state,
					eqn: state.eqn.slice(0, -state.lastInput.length) + x,
					lastInput: x.toString(),
				};
			} else {
				return state;
			}
		case 'CLEAR_ALL':
			return {
				...state,
				eqn: '',
				lastInput: '0',
				solved: '',
			};
		case 'PAREN_INPUT':
			let mismatches = mismatchParen(state.eqn);
			if (state.eqn === '') {
				return {
					...state,
					eqn: '(',
					lastInput: '(',
				};
			} else if (precedence[state.lastInput] || state.lastInput === '(') {
				return {
					...state,
					eqn: state.eqn + ' (',
					lastInput: '(',
				};
			} else if (mismatches.length > 0 && isFinite(state.lastInput)) {
				return {
					...state,
					eqn: state.eqn + ' )',
					lastInput: ')',
				};
			} else if (mismatches.length > 0 && state.lastInput === ')') {
				return { ...state, eqn: state.eqn + ' )', lastInput: ')' };
			} else if (state.lastInput === ')' || isFinite(state.lastInput)) {
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
					lastInput: '0.',
				};
			} else if (state.lastInput.endsWith('.')) {
				return {
					...state,
				};
				// } else if (state.lastInput === ')' || state.lastInput.includes('.')) {
				// 	return {
				// 		...state,
				// 		eqn: state.eqn + ' * 0.',
				// 		lastInput: '0.',
				// 	};
			} else if (
				Number.isInteger(+state.lastInput) &&
				!state.lastInput.includes('.')
			) {
				return {
					...state,
					eqn: state.eqn + action.payload,
					lastInput: state.lastInput + '.',
				};
			} else {
				return {
					...state,
				};
			}
		case 'UPDATE_EQN':
			if (state.lastInput === '0') {
				return {
					...state,
					eqn: state.eqn.slice(0, -1) + action.payload,
					lastInput: action.payload,
				};
			} else if (state.lastInput === '-' && precedence[state.eqn.slice(-3, -2)]) {
                return {
                    ...state,
                    eqn: state.eqn + action.payload,
                    lastInput: state.lastInput + action.payload
                }
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
				};
			}
		case 'MEM_ADD':
			if (isFinite(solution(state.eqn))) {
				sessionStorage.setItem('number', solution(state.eqn));
				return {
					...state,
				};
			} else {
				return {
					...state,
				};
			}
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
		case 'OPERATOR_INPUT':
			if (state.lastInput === '(' || state.eqn === '') {
				return {
					...state,
				};
			} else if (action.payload === '-' && state.lastInput !== action.payload) {
				return {
                    ...state,
                    eqn: state.eqn + ' ' + action.payload,
                    lastInput: action.payload
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
		case 'SOLVE_EQN':
			const solved = document.getElementById('display').innerHTML;
			if (isFinite(solved)) {
				return {
					...state,
					eqn: solution(state.eqn),
					lastInput: solution(state.eqn),
					solved: solution(state.eqn),
				};
			} else {
				return {
					...state,
				};
			}
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

export default eqnReducer;
