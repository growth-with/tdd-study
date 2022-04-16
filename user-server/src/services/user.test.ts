import UserService from './user';
import UserRepository from '../repositories/user';

describe('', () => {
  it('회원 가입이 되어야 합니다.', async () => {
    const mockedRepo = { insert: jest.fn().mockResolvedValue({}) };

    const service = new UserService(mockedRepo as unknown as UserRepository);

    const res = await service.signup({
      userId: 'test',
      password: 'test',
    });

    expect(res).toBe(true);
  });

  // it('로그인이 되어야 합니다.', async () => {
  //   const mockedRepo = { insert: jest.fn().mockResolvedValue({}) };

  //   const service = new UserService(mockedRepo as unknown as UserRepository);

  //   const res = await service.login({
  //     userId: 'test',
  //     password: 'test',
  //   });
  //   console.log(res);

  //   expect(res).toBe('');
  // });
});
