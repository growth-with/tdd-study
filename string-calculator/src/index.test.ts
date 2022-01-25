import { calculate, parse, isOp, isNum, IToken } from './index';

describe('isOp 함수 테스트', () => {
  it('+, -, *, /에 대해서 참을 반환해야 합니다.', () => {
    const operators = ['+', '-', '*', '/'];
    operators.forEach((op)=> {
      expect(isOp(op)).toBe(true);
    });
  });

  it('사칙연산자 외 다른 문자에 대해서 거짓을 반환해야 합니다.', () => {
    expect(isOp('123')).toBe(false);
    expect(isOp('wefwef')).toBe(false);
    expect(isOp('!@#$')).toBe(false);
  });

  it('공백 문자와 빈 문자열에 대해 거짓을 반환해야 합니다.', () => {
    expect(isOp(' ')).toBe(false);
    expect(isOp('')).toBe(false);
  });
});

describe('isNum 함수 테스트', () => {
  it('숫자 입력에 대해서 참을 반환해야 합니다.', () => {
    expect(isNum('123')).toBe(true);
    expect(isNum('1235.123')).toBe(true);
    expect(isNum('1003')).toBe(true);
  });

  it('숫자 외 다른 문자에 대해서 거짓을 반환해야 합니다.', () => {
    expect(isNum('+-*/')).toBe(false);
    expect(isNum('wefwef')).toBe(false);
    expect(isNum('!@#$')).toBe(false);
  });

  it('공백 문자와 빈 문자열에 대해 거짓을 반환해야 합니다.', () => {
    expect(isNum(' ')).toBe(false);
    expect(isNum('')).toBe(false);
  });
});

describe('parse 함수 테스트', () => {
  it("'10 + 2 * 123.456 - 3.24' 계산식을 숫자와 연산자로 분리해야 합니다.", () => {
    const tokens = parse('10 + 2 * 123.456 - 3.24');
    const result: IToken[] = [
      { type: 'NUM', value: '10' },
      { type: 'OP', value: '+' },
      { type: 'NUM', value: '2' },
      { type: 'OP', value: '*' },
      { type: 'NUM', value: '123.456' },
      { type: 'OP', value: '-' },
      { type: 'NUM', value: '3.24' },
    ];
    tokens.forEach((token, index) => {
      expect(token).toEqual(result[index]);
    });
  });

  it("숫자, 연산자가 아닌 다른 문자가 들어왔을 때 에러를 던져야 합니다.", () => {
    expect(() => parse('1 + hello')).toThrow('unsupported token type');
  });

  it('숫자가 연속되어 있으면 에러를 던져야 합니다.', () => {
    expect(() => parse('1 1 123 + 123')).toThrow('A number cannot be followed by a number');
  });

  it('연산자가 연속되어 있으면 에러를 던져야 합니다.', () => {
    expect(() => parse('1 + + 123')).toThrow('A operator cannot be followed by a operator');
  });

  it('공백을 한 개이상 사용할 경우 에러를 던져야 합니다.', () => {
    expect(() => parse('1  +     2')).toThrow('There must be only one space between tokens');
  });
});

describe('calculate 함수 테스트', () => {
  it("'10 + 2' 계산식을 12로 계산해야 합니다.", () => {
    const result = calculate('10 + 2');
    expect(result).toBe(12);
  });
});
