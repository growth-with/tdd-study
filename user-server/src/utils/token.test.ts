import { jwtSign, jwtParse } from './token';

describe('', () => {
  it('올바른 토큰이 생성되어야 합니다.', () => {
    const token = jwtSign('테스트 아이디');
    expect(jwtParse(token)).not.toBeUndefined();
  });
});
