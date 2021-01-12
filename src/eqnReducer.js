import { precedence, solution,  mismatchParen, signChange } from './utilityFunctions';

// const { precedence, solvePostfix,  mismatchParen, signChange } = utilityFunctions;

const eqnReducer = (state, action) => {
    switch (action.type) {
        case 'BACKSPACE':
            let newEqn, newInput;
            if (state.eqn === '') {
                return state;
            } else if (state.lastInput.startsWith('-') && state.lastInput.length === 2) {
                newEqn = state.eqn.slice(0, -2).trim();
                newInput = newEqn.split(' ').pop();
                return {
                    ...state,
                    eqn: newEqn,
                    lastInput: newInput
                }
            } else {
                newEqn = state.eqn.slice(0, -1).trim();
                newInput = newEqn.split(' ').pop();
                return {
                    ...state,
                    eqn: newEqn,
                    lastInput: newInput
                }
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
                    lastInput: '0.',
                };
            } else if (state.lastInput.endsWith('.')) {
                return {
                    ...state,
                };
            } else if (state.lastInput === ')' || state.lastInput.includes('.')) {
                return {
                    ...state,
                    eqn: state.eqn + ' * 0.',
                    lastInput: '0.',
                };
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
            sessionStorage.setItem('number', solution);
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
            }
        // case 'SOLVE_EQN':
        //     // let solution = solvePostfix(state.eqn);
        //     return {
        //         ...state,
        //         eqn: solution,
        //         lastInput: solution,
        //         solution: solution,
        //     };
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

export default eqnReducer
