import { calculate, parse } from "./index";

describe("parse 함수 테스트", () => {
  it("'10 + 2 * 123.456 - 3.24' 계산식을 숫자와 연산자로 분리해야 합니다.", () => {
    const tokens = parse("10 + 2 * 123.456 - 3.24");
    const result: string[] = ["10", "+", "2", "*", "123.456", "-", "3.24"];
    tokens.forEach((token, index) => {
      expect(token).toEqual(result[index]);
    });
  });

  it("숫자, 연산자가 아닌 다른 문자가 들어왔을 때 에러를 던져야 합니다.", () => {
    expect(() => parse("1 + hello")).toThrow("unsupported token type");
  });

  it("숫자가 연속되어 있으면 에러를 던져야 합니다.", () => {
    expect(() => parse("1 1 123 + 123")).toThrow(
      "A number cannot be followed by a number"
    );
  });

  it("연산자가 연속되어 있으면 에러를 던져야 합니다.", () => {
    expect(() => parse("1 + + 123")).toThrow(
      "A operator cannot be followed by a operator"
    );
  });

  it("공백을 한 개이상 사용할 경우 에러를 던져야 합니다.", () => {
    expect(() => parse("1  +     2")).toThrow(
      "There must be only one space between tokens"
    );
  });
});

describe("calculate 함수 연산자 1개 테스트", () => {
  it("'10 + 2' 계산식을 12로 계산해야 합니다.", () => {
    const result = calculate("10 + 2");
    expect(result).toBe(12);
  });

  it("'10 - 2' 계산식을 8로 계산해야 합니다.", () => {
    const result = calculate("10 - 2");
    expect(result).toBe(8);
  });

  it("'10 / 2' 계산식을 5로 계산해야 합니다.", () => {
    const result = calculate("10 / 2");
    expect(result).toBe(5);
  });

  it("'10 * 2' 계산식을 20로 계산해야 합니다.", () => {
    const result = calculate("10 * 2");
    expect(result).toBe(20);
  });
});

describe("calculate 함수 우선순위가 같은 연산자 2개 테스트", () => {
  it("'10 + 2 - 3' 계산식을 15로 계산해야 합니다.", () => {
    const result = calculate("10 + 2 - 3");
    expect(result).toBe(9);
  });

  it("'10 / 2 * 3' 계산식을 15로 계산해야 합니다.", () => {
    const result = calculate("10 / 2 * 3");
    expect(result).toBe(15);
  });
});

describe("calculate 함수 우선순위가 다른 연산자 2개 테스트", () => {
  it("'10 + 2 * 3' 계산식을 9로 계산해야 합니다.", () => {
    const result = calculate("10 + 2 * 3");
    expect(result).toBe(16);
  });

  it("'10 / 2 + 3' 계산식을 8로 계산해야 합니다.", () => {
    const result = calculate("10 / 2 + 3");
    expect(result).toBe(8);
  });
});
