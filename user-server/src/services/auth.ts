import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { commonError } from '../constants/error';
import UserRepository from '../repositories/user';
import { UserInfo } from '../types';
import ErrorResponse from '../utils/error-response';
import JwtUtil from '../utils/jwt';

@Service()
class AuthService {
  private userRepository: UserRepository;

  private jwtUtil: JwtUtil;

  constructor(
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @Inject('jwtUtil') jwtUtil: JwtUtil,
  ) {
    this.userRepository = userRepository;
    this.jwtUtil = jwtUtil;
  }

  async login({ userId, password }: UserInfo): Promise<{ access: string; refresh: string }> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    // 테스트용임으로 암호화하지 않았기 떄문에 바로 비교함.
    const isValid = user.password === password;
    if (!isValid) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const access = this.jwtUtil.generateAccessToken({ uid: user.uid });
    const refresh = this.jwtUtil.generateRefreshToken({ uid: user.uid });

    return { access, refresh };
  }

  // @TODO refresh token을 사용해 새 access token을 발급하는 메서드 추가 필요
}

export default AuthService;
