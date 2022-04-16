import jwt, { JwtPayload } from 'jsonwebtoken';
const privateKey = 'asdasd';

export const jwtSign = (id: string): string => {
  return jwt.sign({ id }, privateKey);
};

export const jwtParse = (token: string): JwtPayload | string => {
  return jwt.verify(token, privateKey);
};
