export type OpType = "+" | "-" | "/" | "*";

export const isOpType = (str: string): str is OpType => {
  const opList = ["+", "-", "/", "*"];
  return opList.includes(str);
};

export const opFunc: Record<OpType, (a: number, b: number) => number> = {
  "+": (a: number, b: number): number => a + b,
  "-": (a: number, b: number): number => a - b,
  "/": (a: number, b: number): number => a / b,
  "*": (a: number, b: number): number => a * b,
};

export const isOp = (s: string): Boolean => {
  const operators: string[] = ["+", "-", "*", "/"];

  return s !== " " && s !== "" && operators.includes(s);
};

export const isNum = (s: string): Boolean => {
  return s !== " " && s !== "" && !isNaN(Number(s));
};

export const opPriorityCompare = (opA: string, opB: string): number => {
  const highPriorityOp = ["*", "/"];

  const priorityOfOpA = highPriorityOp.includes(opA) ? 2 : 1;
  const priorityOfOpB = highPriorityOp.includes(opB) ? 2 : 1;

  return priorityOfOpA - priorityOfOpB;
};

export const convertInfixToPostfix = (infix: string[]): string[] => {
  const postfix: string[] = [];
  const stack: string[] = [];

  const moveStackTopItemToPostFix = () => {
    const popItem = stack.pop();
    if (popItem) {
      postfix.push(popItem);
    }
  };

  infix.forEach((v) => {
    // 피연산자는 바로 push
    if (isNum(v)) return postfix.push(v);

    // 연산자 일 경우, 기존 stack에서 우선순위 같거나 높은 애들 push하고 자신을 stack에 추가
    if (isOp(v)) {
      for (let i = stack.length - 1; isOp(stack[i]); i -= 1) {
        if (opPriorityCompare(stack[i], v) >= 0) {
          moveStackTopItemToPostFix();
        }
      }
      return stack.push(v);
    }

    if (v === "(") return stack.push(v);

    // 닫는 괄호 일 경우 여는 괄호를 만날 때까지 push
    if (v === ")") {
      for (let i = stack.length - 1; stack[i] !== "(" && i >= 0; i -= 1) {
        moveStackTopItemToPostFix();
      }
      return stack.pop();
    }
  });

  // 남은 연산자들 push
  stack.reverse().forEach((v) => postfix.push(v));

  return postfix;
};
