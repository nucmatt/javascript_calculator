export const precedence = {
    '^': 4,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
};
export const associativity = {
    '^': 'right',
    '*': 'left',
    '/': 'left',
    '+': 'left',
    '-': 'left',
};
export const infixToPostfix = (string) => {
    let outputStack = [];
    let operatorStack = [];
    let infixArray = string.split(' ');
    while (infixArray.length > 0) {
        let token = infixArray.shift();
        let operator = operatorStack[0];
        // if token is a number, push it to outputStack
        if (parseFloat(token)) {
            outputStack.push(parseFloat(token));
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
            }
            // then push current token to front of operatorStack
            operatorStack.unshift(token);
        } else if (token === ')') {
            while (operator !== '(' && operatorStack.length > 0) {
                outputStack.push(operator);
                operatorStack.shift();
                operator = operatorStack[0];
                console.log('if executed');
            }
            if (operator === '(') {
                operatorStack.shift();
            }
        } else {
            // if no operatorStack operators, push token to operatorStack
            operatorStack.push(token);
        }
    }
    // once infixArray is empty push operator stack onto output stack
    while (operatorStack[0]) {
        outputStack.push(operatorStack.shift());
    }
    return outputStack;
};

export const solvePostfix = (string) => {
    const stack = [];
    const expression = infixToPostfix(string);
    let a, b, solution;
    for (let i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case '+':
                a = stack.pop();
                b = stack.pop();
                stack.push(b + a);
                break;
            case '-':
                a = stack.pop();
                b = stack.pop();
                stack.push(b - a);
                break;
            case '*':
                a = stack.pop();
                b = stack.pop();
                stack.push(b * a);
                break;
            case '/':
                a = stack.pop();
                b = stack.pop();
                stack.push(b / a);
                break;
            case '^':
                a = stack.pop();
                b = stack.pop();
                stack.push(Math.pow(b, a));
                break;
            default:
                stack.push(expression[i]);
        }
    }
    solution = stack.pop();
    return solutionPrecision(solution);
};
export const solutionPrecision = (result) => {
    if (result === '0') {
        return 0;
    // } else if (Number.isInteger(result)) {
    //     return result;
    } else if (Number.isFinite(result)) {
        return parseFloat(result.toFixed(4));
    } else {
        return 0;
    }
};
export const greaterPrecedence = (operator, token) => {
    return precedence[operator] > precedence[token];
};
export const leftAssociative = (operator, token) => {
    return (
        precedence[operator] === precedence[token] &&
        associativity[token] === 'left'
    );
};
export const mismatchParen = (string) => {
    let stack = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '(') {
            stack.push(i);
        } else if (string[i] === ')') {
            stack.pop();
        }
    }
    return stack;
};
export const filterParen = (string) => {
    let index, filtered, mismatches;
    mismatches = mismatchParen(string);
    filtered = string;
    for (let i = 0; i < mismatches.length; i++) {
        index = mismatches[i];
        console.log(mismatches, index, filtered);
        if (index === 0) {
            filtered = filtered.slice(1).trim();
        } else {
            filtered = filtered.slice(0, index) + filtered.slice(index + 1).trim();
        }
    }
    return filtered;
};
export const signChange = (string) => {
    return string * -1;
};
export const solution = (string) => {
    return solvePostfix(filterParen(string));
}
