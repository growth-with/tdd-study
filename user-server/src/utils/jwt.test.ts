import JwtUtil, { JwtOptions } from './jwt';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('JwtUtil 클래스 테스트', () => {
  const mockJwtOptions: JwtOptions = {
    algorithm: 'ES256',
    secret: 'SECRET',
    accessExpiresInHour: 0.5,
    refreshExpiresInHour: 336,
  };
  const mockAccessToken = 'MOCK_ACCESS_TOKEN';
  const mockRefreshToken = 'MOCK_REFRESH_TOKEN';
  const mockAccessTokenBody = { uid: 'ACCESS_TOKEN_UID' };
  const mockRefreshTokenBody = { uid: 'REFRESH_TOKEN_UID' };

  it('Access/Refresh Token을 생성할 수 있어야 합니다.', () => {
    const jwtUtil = new JwtUtil(mockJwtOptions);

    mockedJwt.sign.mockImplementationOnce((): string => mockAccessToken);
    const accessToken = jwtUtil.generateAccessToken(mockAccessTokenBody);

    mockedJwt.sign.mockImplementationOnce((): string => mockRefreshToken);
    const refreshToken = jwtUtil.generateAccessToken(mockRefreshTokenBody);

    expect(accessToken).toBe(mockAccessToken);
    expect(refreshToken).toBe(mockRefreshToken);
  });

  it('Access/Refresh Token에 대해 decoding할 수 있어야 합니다.', () => {
    const jwtUtil = new JwtUtil(mockJwtOptions);

    mockedJwt.verify.mockImplementation(() => mockAccessTokenBody);
    const decodedAccessPayload = jwtUtil.decodeAccessToken(mockAccessToken);
    expect(decodedAccessPayload).toEqual(mockAccessTokenBody);

    mockedJwt.verify.mockImplementation(() => mockRefreshTokenBody);
    const decodedRefreshPayload = jwtUtil.decodeRefreshToken(mockRefreshToken);
    expect(decodedRefreshPayload).toEqual(mockRefreshTokenBody);
  });
});
