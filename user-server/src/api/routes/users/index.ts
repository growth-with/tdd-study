import { Router } from 'express';

import { userSignUpValidation } from '../../validation/user';
import { handleSignUp } from './users.controller';

const router = Router();

router.post('/', userSignUpValidation, handleSignUp);

export default router;
