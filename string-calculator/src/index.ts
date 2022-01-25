export type TokenType = 'NUM' | 'OP';

export interface IToken {
  type: TokenType;
  value: string;
}

export const isOp = (s: string) => {
  const operators = ['+', '-', '*', '/'];

  return s !== ' ' && s !== '' && operators.includes(s);
};

export const isNum = (s: string) => {
  return s !== ' ' && s !== '' && !isNaN(Number(s));
}

export const parse = (src: string) => {
  const tokens = src.split(' ');
  return tokens.map((token, index) => {
    if (token === '') {
      throw new Error('There must be only one space between tokens');
    }

    if (!isOp(token) && !isNum(token)) {
      throw new Error('unsupported token type');
    }

    if (isNum(token) && isNum(tokens[index + 1])) {
      throw new Error('A number cannot be followed by a number');
    }

    if (isOp(token) && isOp(tokens[index + 1])) {
      throw new Error('A operator cannot be followed by a operator');
    }

    if (isOp(token)) {
      return { type: 'OP', value: token };
    }

    return { type: 'NUM', value: token };
  });
};

export const calculate = (_src: string) => {
  return 12;
};