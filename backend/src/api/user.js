import express from 'express';
import login from './user-login.js';
import signup from './user-signup.js';
import changePassword from './user-change-password.js';
import auth from '../utils/auth.js';
import coinToss from './coin-toss.js';
import getUserTokens from './user-get-tokens.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/changePassword', auth, changePassword);
router.post('/coinToss', coinToss);
router.get('/getUserTokens', auth, getUserTokens);

export default router;
