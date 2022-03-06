import calculate from "./index";

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
