import { opFunc, isOpType, convertInfixToPostfix, isNum } from "./util";
import parse from "./parse";

const calculate = (src: string): number => {
  const tokens = convertInfixToPostfix(parse(src));

  const tempTokens: string[] = [];

  tokens.forEach((element) => {
    if (isNum(element)) {
      return tempTokens.push(element);
    }

    const a = tempTokens.pop();
    const b = tempTokens.pop();
    if (!a || !b || !isOpType(element)) {
      return;
    }

    tempTokens.push(opFunc[element](parseFloat(b), parseFloat(a)).toString());
  });

  return parseFloat(tempTokens[0]);
};

export default calculate;
