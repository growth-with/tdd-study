export type OpType = "+" | "-" | "/" | "*";

export const isOpType = (str: string): str is OpType => {
  const opList = ['+', '-', '/', '*'];
  return opList.includes(str);
}

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
