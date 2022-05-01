import jwt, { Algorithm, JwtPayload, SignOptions } from 'jsonwebtoken';

export type JwtOptions = {
  algorithm: Algorithm;
  secret: string;
  accessExpiresInHour: number;
  refreshExpiresInHour: number;
};

type AccessJwtPayload = {
  uid: string;
};

type RefreshJwtPayload = {
  uid: string;
};

class JwtUtil {
  private algorithm: Algorithm;

  private secret: string;

  private accessExpiresInSeconds: number;

  private refreshExpiresInSeconds: number;

  private static readonly accessTokenSubject = 'ACCESS_TOKEN';

  private static readonly refreshTokenSubject = 'ACCESS_TOKEN';

  constructor({ algorithm, secret, accessExpiresInHour, refreshExpiresInHour }: JwtOptions) {
    this.algorithm = algorithm;
    this.secret = secret;
    this.accessExpiresInSeconds = accessExpiresInHour * 3600;
    this.refreshExpiresInSeconds = refreshExpiresInHour * 3600;
  }

  generateAccessToken(payload: AccessJwtPayload): string {
    const signOptions: SignOptions = {
      algorithm: this.algorithm,
      expiresIn: this.accessExpiresInSeconds,
      subject: JwtUtil.accessTokenSubject,
    };
    return jwt.sign(payload, this.secret, signOptions);
  }

  generateRefreshToken(payload: RefreshJwtPayload): string {
    const signOptions: SignOptions = {
      algorithm: this.algorithm,
      expiresIn: this.refreshExpiresInSeconds,
      subject: JwtUtil.refreshTokenSubject,
    };
    return jwt.sign(payload, this.secret, signOptions);
  }

  private decodeJwtToken(token: string, subject?: string): string | JwtPayload {
    const decodeToken = jwt.verify(token, this.secret, {
      algorithms: [this.algorithm],
      subject,
    });
    return decodeToken;
  }

  decodeAccessToken(token: string): string | JwtPayload {
    return this.decodeJwtToken(token, JwtUtil.accessTokenSubject);
  }

  decodeRefreshToken(token: string): string | JwtPayload {
    return this.decodeJwtToken(token, JwtUtil.refreshTokenSubject);
  }
}

export default JwtUtil;
