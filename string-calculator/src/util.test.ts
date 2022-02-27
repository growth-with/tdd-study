import { isOp, isNum, opFunc } from "./util";

describe("isOp 함수 테스트", () => {
  it("+, -, *, /에 대해서 참을 반환해야 합니다.", () => {
    const operators = ["+", "-", "*", "/"];
    operators.forEach((op) => {
      expect(isOp(op)).toBe(true);
    });
  });

  it("사칙연산자 외 다른 문자에 대해서 거짓을 반환해야 합니다.", () => {
    expect(isOp("123")).toBe(false);
    expect(isOp("wefwef")).toBe(false);
    expect(isOp("!@#$")).toBe(false);
  });

  it("공백 문자와 빈 문자열에 대해 거짓을 반환해야 합니다.", () => {
    expect(isOp(" ")).toBe(false);
    expect(isOp("")).toBe(false);
  });
});

describe("isNum 함수 테스트", () => {
  it("숫자 입력에 대해서 참을 반환해야 합니다.", () => {
    expect(isNum("123")).toBe(true);
    expect(isNum("1235.123")).toBe(true);
    expect(isNum("1003")).toBe(true);
  });

  it("숫자 외 다른 문자에 대해서 거짓을 반환해야 합니다.", () => {
    expect(isNum("+-*/")).toBe(false);
    expect(isNum("wefwef")).toBe(false);
    expect(isNum("!@#$")).toBe(false);
  });

  it("공백 문자와 빈 문자열에 대해 거짓을 반환해야 합니다.", () => {
    expect(isNum(" ")).toBe(false);
    expect(isNum("")).toBe(false);
  });
});

describe("opFunc 함수 테스트", () => {
    it("사칙연산이 작동해야 합니다.", () => {
        expect(opFunc['+'](2,2)).toBe(4);
        expect(opFunc['-'](2,2)).toBe(0);
        expect(opFunc['/'](2,2)).toBe(1);
        expect(opFunc['*'](2,2)).toBe(4);
    });
});