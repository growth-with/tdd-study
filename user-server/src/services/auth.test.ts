import UserRepository from '../repositories/user';
import JwtUtil from '../utils/jwt';
import AuthService from './auth';

describe('AuthService 테스트', () => {
  const mockAccessToken = 'MOCK_ACCESS_TOKEN';
  const mockRefreshToken = 'MOCK_REFRESH_TOKEN';
  const mockedUser = {
    uid: 'MOCK_USER_UID',
    userId: 'MOCK_USER_ID',
    password: 'MOCK_USER_PASSWORD',
  };

  const mockedUserRepository = { findOne: jest.fn() };
  const mockedJwtUtils = {
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn(),
  };

  describe('AuthService.login 메서드', () => {
    it('로그인에 성공하면 access/refresh token을 반환해야 합니다.', async () => {
      mockedUserRepository.findOne.mockResolvedValueOnce(mockedUser);
      mockedJwtUtils.generateAccessToken.mockReturnValueOnce(mockAccessToken);
      mockedJwtUtils.generateRefreshToken.mockReturnValueOnce(mockRefreshToken);

      const service = new AuthService(
        mockedUserRepository as unknown as UserRepository,
        mockedJwtUtils as unknown as JwtUtil,
      );

      const res = await service.login({
        userId: mockedUser.userId,
        password: mockedUser.password,
      });

      expect(res).toEqual({
        access: mockAccessToken,
        refresh: mockRefreshToken,
      });
    });

    it('userId가 다르거나 password가 다르면 Unauthorized 에러를 던져야 합니다.', async () => {
      mockedUserRepository.findOne.mockImplementationOnce(
        (option: { where: { userId: string } }) => {
          const { userId } = option.where;
          return Promise.resolve(userId === mockedUser.userId ? mockedUser : undefined);
        },
      );

      const service = new AuthService(
        mockedUserRepository as unknown as UserRepository,
        mockedJwtUtils as unknown as JwtUtil,
      );

      await expect(() =>
        service.login({
          userId: 'difference',
          password: mockedUser.password,
        }),
      ).rejects.toThrow('Unauthorized');

      await expect(() =>
        service.login({
          userId: mockedUser.userId,
          password: 'difference',
        }),
      ).rejects.toThrow('Unauthorized');
    });
  });
});
