import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

import UserService from '../../../services/user';

export const handleSignUp = async (
  req: Request<
    Record<string, string>,
    void,
    {
      password: string;
      userId: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userServiceInstance = Container.get(UserService);
    await userServiceInstance.signup(req.body);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};
