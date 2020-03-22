function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let stack1 = [];
    let stack2 = [];

    let bracket_open = 0;
    let bracket_closed = 0;
    if (expr.match(/\(/g)) { bracket_open = expr.match(/\(/g).length } else { bracket_open = 0 };
    if (expr.match(/\)/g)) { bracket_closed = expr.match(/\)/g).length } else { bracket_closed = 0 };
    if (bracket_open !== bracket_closed) { throw Error('ExpressionError: Brackets must be paired') };

    let OPERATORS = {
        '*': (a, b) => { return a * b },
        '/': (a, b) => { return a / b },
        '+': (a, b) => { return a + b },
        '-': (a, b) => { return a - b },
    };
    let PRIORITY = { '+': 1, '-': 1, '*': 2, '/': 2 };


    if (!expr.includes(' ')) {
        expr = expr.split('').join(' ');
    };

    let expr_Arr = expr.split(' ');
    while (expr_Arr.includes('')) {
        expr_Arr.splice(expr_Arr.indexOf(''), 1);
    }
    expr_Arr.forEach(el => {
        if (/[0-9]/.test(el)) {
            stack1.push(el);
        } else if (el == ')') {
            while (stack2[stack2.length - 1] !== '(') {
                let b = stack1.pop();
                let a = stack1.pop();
                let operator = stack2.pop();
                if (operator == '/' && b == 0) { throw Error('TypeError: Division by zero.') };
                stack1.push(OPERATORS[operator](+a, +b));
            }
            stack2.pop();

        } else if (el == '(' || stack2[stack2.length - 1] == '(' || PRIORITY[stack2[stack2.length - 1]] < PRIORITY[el]) {
            stack2.push(el)
        } else {
            while (PRIORITY[el] <= PRIORITY[stack2[stack2.length - 1]]) {
                let b = stack1.pop();
                let a = stack1.pop();
                let operator = stack2.pop();
                if (operator == '/' && b == 0) { throw Error('TypeError: Division by zero.') };
                stack1.push(OPERATORS[operator](+a, +b));
            };
            stack2.push(el);
        };
    });
    while (stack2.length > 0) {
        let b = stack1.pop();
        let a = stack1.pop();
        let operator = stack2.pop();
        if (operator == '/' && b == 0) { throw Error('TypeError: Division by zero.') };
        stack1.push(OPERATORS[operator](+a, +b));
    }
    return Number(stack1.join());
}

module.exports = {
    expressionCalculator
}