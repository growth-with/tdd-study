import { isNum, isOp, opFunc, OpType, isOpType } from "./util";

export type TokenType = "NUM" | "OP";

export interface IToken {
  type: TokenType;
  value: string;
}

export const parse = (src: string) => {
  const tokens = src.split(" ");
  return tokens.map((token, index) => {
    if (token === "") {
      throw new Error("There must be only one space between tokens");
    }

    if (!isOp(token) && !isNum(token)) {
      throw new Error("unsupported token type");
    }

    if (isNum(token) && isNum(tokens[index + 1])) {
      throw new Error("A number cannot be followed by a number");
    }

    if (isOp(token) && isOp(tokens[index + 1])) {
      throw new Error("A operator cannot be followed by a operator");
    }

    if (isOp(token)) {
      return { type: "OP", value: token };
    }

    return { type: "NUM", value: token };
  });
};

export const calculate = (src: string): number => {
  const tokens = parse(src).map((e) => e.value);

  let newTokens: string[] = [tokens[0]];

  tokens.splice(0, 1);

  while (1) {
    if (tokens[0] === "/" || tokens[0] === "*") {
      newTokens[newTokens.length - 1] = opFunc[tokens[0]](
        parseFloat(newTokens[newTokens.length - 1]),
        parseFloat(tokens[1])
      ).toString();
    } else {
      newTokens = newTokens.concat(tokens.slice(0, 2));
    }
    tokens.splice(0, 2);

    if (tokens.length < 1) {
      break;
    }
  }
  let result = parseFloat(newTokens[0]);

  for (let i = 1; i < newTokens.length; i += 2) {
    const opType = newTokens[i];
    if (isOpType(opType)) {
      result = opFunc[opType](result, parseFloat(newTokens[i + 1]));
    }
  }

  return result;
};
