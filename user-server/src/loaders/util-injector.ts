import { Algorithm } from 'jsonwebtoken';
import { ObjectLiteral } from 'typeorm';
import config from '../config';
import JwtUtil from '../utils/jwt';

import dependencyInjector, { DependencyInfo } from './dependency-injector';

const utilInjector = () => {
  const { algorithm, secret, expire } = config.jwt;

  const utils: DependencyInfo<ObjectLiteral>[] = [
    {
      name: 'jwtUtil',
      dependency: new JwtUtil({
        algorithm: algorithm as Algorithm,
        secret,
        accessExpiresInHour: expire.access,
        refreshExpiresInHour: expire.refresh,
      }),
    },
  ];

  dependencyInjector<ObjectLiteral>(utils);
};

export default utilInjector;
