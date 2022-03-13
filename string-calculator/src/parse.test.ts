import parse from "./parse";

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