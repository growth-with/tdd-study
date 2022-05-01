import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../repositories/user';

@Service()
class UserService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async signup(param: { password: string; userId: string }) {
    try {
      const res = await this.userRepository.insert(param);

      return !!res;
    } catch (e) {
      return false;
    }
  }

  // @TODO 회원탈퇴/사용자 정보 조회 메서드 추가
}

export default UserService;
