import { EntityRepository, Repository } from 'typeorm';

import UserEntity from '../entity/user';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {}

export default UserRepository;
