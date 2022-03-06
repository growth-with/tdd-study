import { isNum, isOp } from "./util";

const parse = (src: string): string[] => {
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

    return token;
  });
};

export default parse;
